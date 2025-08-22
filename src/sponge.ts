import BitArray from "./bitarray";
import { StateArray } from "./state";

/**
 * Performs a modulo operation on two numbers
 * @param n The dividend
 * @param d The divisor
 * @returns The result of modulo
 */
function mod(n: number, d: number) {
	return ((n % d) + d) % d;
}

/**
 * XOR each bit in the state with the parities of two columns in the array.
 * @param A The state array
 * @returns The altered state array
 */
function theta(A: StateArray): StateArray {
	const C = new StateArray(A.size);
	const D = new StateArray(A.size);
	const out = new StateArray(A.size);

	for (let x = 0; x < 5; x++) {
		for (let z = 0; z < A.size.w; z++) {
			let value = A.getBit(x, 0, z) ^ A.getBit(x, 1, z) ^ A.getBit(x, 2, z) ^ A.getBit(x, 3, z) ^ A.getBit(x, 4, z);

			C.setBit(x, 0, z, value);
		}
	}

	for (let x = 0; x < 5; x++) {
		for (let z = 0; z < A.size.w; z++) {
			let value = C.getBit(mod(x - 1, 5), 0, z) ^ C.getBit(mod(x + 1, 5), 0, mod(z - 1, A.size.w));

			D.setBit(x, 0, z, value);
		}
	}

	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < A.size.w; z++) {
				let value = A.getBit(x, y, z) ^ D.getBit(x, 0, z);

				out.setBit(x, y, z, value);
			}
		}
	}

	return out;
}

/**
 * Rotate the bits of each lane by a length, called the offset, which depends on the fixed x and y coordinates of the lane.
 * @param A The state array
 * @returns The altered state array
 */
function rho(A: StateArray): StateArray {
	const out = new StateArray(A.size);

	for (let z = 0; z < A.size.w; z++) {
		let value = A.getBit(0, 0, z);

		out.setBit(0, 0, z, value);
	}

	let x = 1,
		y = 0;

	for (let t = 0; t < 24; t++) {
		for (let z = 0; z < A.size.w; z++) {
			let value = A.getBit(x, y, mod(z - ((t + 1) * (t + 2)) / 2, A.size.w));

			out.setBit(x, y, z, value);
		}

		[x, y] = [y, mod(2 * x + 3 * y, 5)];
	}

	return out;
}

/**
 * Rearrange the positions of the lanes.
 * @param A The state array
 * @returns The altered state array
 */
function pi(A: StateArray): StateArray {
	const out = new StateArray(A.size);

	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < A.size.w; z++) {
				let value = A.getBit(mod(x + 3 * y, 5), x, z);

				out.setBit(x, y, z, value);
			}
		}
	}

	return out;
}

/**
 * XOR each bit with a non-linear function of two other bits in its row.
 * @param A The state array
 * @returns The altered state array
 */
function chi(A: StateArray): StateArray {
	const out = new StateArray(A.size);

	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < A.size.w; z++) {
				let value = A.getBit(x, y, z) ^ ((1 ^ A.getBit(mod(x + 1, 5), y, z)) & A.getBit(mod(x + 2, 5), y, z));

				out.setBit(x, y, z, value);
			}
		}
	}

	return out;
}

/**
 * Computes a round constant using a linear feedback shift register.
 * @param t An integer
 * @returns Generated bit
 */
function rc(t: number): number {
	if (mod(t, 255) === 0) return 1;

	let R = 1;
	for (let i = 0; i < mod(t, 255); i++) {
		if (R & 0x80) {
			R = ((R << 1) ^ 0x71) & 0xff;
		} else {
			R <<= 1;
		}
	}

	return R & 1;
}

/**
 * Modify some of the bits of Lane(0, 0) in a manner that depends on the round index, i.
 * @param A The state array
 * @param i A round index
 * @returns The altered state array
 */
function iota(A: StateArray, i: number): StateArray {
	let out = new StateArray(A.size);

	for (let x = 0; x < 5; x++) {
		for (let y = 0; y < 5; y++) {
			for (let z = 0; z < A.size.w; z++) {
				let value = A.getBit(x, y, z);

				out.setBit(x, y, z, value);
			}
		}
	}

	let RC = new BitArray(A.size.w);

	for (let j = 0; j <= A.size.l; j++) {
		RC.setBit(Math.pow(2, j) - 1, rc(j + 7 * i));
	}

	for (let z = 0; z < A.size.w; z++) {
		let value = out.getBit(0, 0, z) ^ RC.getBit(z);

		out.setBit(0, 0, z, value);
	}

	return out;
}

/**
 * Applies the step mappings theta, rho, pi, chi, and iota.
 * @param A The state array
 * @param i A round index
 * @returns The altered state array
 */
function rnd(A: StateArray, i: number): StateArray {
	return iota(chi(pi(rho(theta(A)))), i);
}

/**
 * Applies Keccak permutation to a string
 * @param S The string to process
 * @param b The length of the string
 * @param nr The number of rounds (optional)
 * @returns The altered string
 */
function keccak(S: BitArray, b: number, nr?: number): BitArray {
	let A = new StateArray(StateArray.getStateSize(b));
	let x = 12 + A.size.l * 2;
	let n = nr ?? x;

	A.string = S;

	for (let i = x - n; i < x; i++) {
		A = rnd(A, i);
	}

	return A.string;
}

/**
 * Uses multi-rate padding to generate padding for a BitArray
 * @param x Rate
 * @param m Bits used
 * @param sha Whether to use SHA3 padding or default Keccak padding
 * @returns A BitArray
 */
function pad(x: number, m: number, sha: boolean): BitArray {
	if (m < 0) throw new Error("Integer must not be negative");

	let headBits = sha ? [0, 1, 1, 0] : [1];
	let extraBits = headBits.length + 1;
	let j = mod(-m - extraBits, x);
	let arr = new BitArray(j + extraBits);

	headBits.forEach((bit, i) => {
		arr.setBit(i, !!bit);
	});

	arr.setBit(arr.length - 1, true);

	return arr;
}

/**
 * Absorbs the string and squeezes an output from it
 * @param N The input string
 * @param d The requested length of output, in bits
 * @param b The width of the Keccak permutation
 * @param r The sponge rate
 * @param sha Whether to use SHA3 padding or default Keccak padding
 * @returns A squeezed output
 */
export default function sponge(N: BitArray, d: number, b: number, r: number, sha = false): BitArray {
	if (d < 0) throw new Error("Bit length must not be negative");

	let P = BitArray.concat(N, pad(r, N.length, sha));
	let n = P.length / r;
	let c = b - r;
	let Ps: BitArray[] = [];
	let S = new BitArray(b);

	for (let i = 0; i < n; i++) {
		let temp = new BitArray(r + c);

		for (let k = 0; k < r; k++) {
			temp.setBit(k, P.getBit(i * r + k));
		}

		Ps.push(temp);
	}

	for (let i = 0; i < n; i++) {
		S = keccak(BitArray.xor(S, Ps[i]), b);
	}

	let Z = new BitArray(0);

	while (true) {
		Z = BitArray.concat(Z, S.trunc(r));

		if (d <= Z.length) return Z.trunc(d);

		S = keccak(S, b);
	}
}
