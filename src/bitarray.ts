export default class BitArray {
	array: Uint8Array;
	length: number;

	constructor(length: number) {
		this.length = length;
		this.array = new Uint8Array(Math.ceil(length / 8));
	}

	/**
	 * Performs a concat operation on two BitArrays to make one larger BitArray.
	 * @param A The first BitArray
	 * @param B The second BitArray
	 * @returns A new BitArray
	 */
	static concat(A: BitArray, B: BitArray): BitArray {
		let C = new BitArray(A.length + B.length);

		for (let i = 0; i < A.length; i++) {
			C.setBit(i, A.getBit(i));
		}

		for (let i = 0; i < B.length; i++) {
			C.setBit(i + A.length, B.getBit(i));
		}

		return C;
	}

	/**
	 * Performs a XOR operation on two BitArrays to make a new BitArray.
	 * @param A The first BitArray
	 * @param B The second BitArray
	 * @returns A new BitArray
	 */
	static xor(A: BitArray, B: BitArray): BitArray {
		let C = new BitArray(Math.min(A.length, B.length));

		for (let i = 0; i < C.length; i++) {
			C.setBit(i, A.getBit(i) ^ B.getBit(i));
		}

		return C;
	}

	/**
	 * Generates a new BitArray from an input string, array of bits, or Uint8Array
	 * @param input The input to generate from
	 * @returns A new BitArray
	 */
	static from(input: string | Uint8Array | number[]): BitArray {
		if (Array.isArray(input)) {
			let out = new BitArray(input.length);

			input.forEach((bit: number, i: number) => {
				out.setBit(i, !!bit);
			});

			return out;
		}

		let array: Uint8Array;

		if (input instanceof Uint8Array) {
			array = input;
		} else {
			array = Buffer.from(input, "utf-8");
		}

		let out = new BitArray(array.length * 8);

		out.array = array;

		return out;
	}

	/**
	 * Gets the value of a bit at a given index
	 * @param index The bit index to get
	 * @returns The bit value
	 */
	getBit(index: number): number {
		if (index >= this.length) throw new Error("Index out of range!");

		let byteIndex = Math.floor(index / 8);
		let offset = index % 8;

		return (this.array[byteIndex] >> offset) & 1;
	}

	/**
	 * Sets the value of a bit at a given index
	 * @param index The bit index to set
	 * @param value The bit value
	 */
	setBit(index: number, value: number | boolean) {
		if (index >= this.length) throw new Error("Index out of range!");

		let byteIndex = Math.floor(index / 8);
		let offset = index % 8;

		if (!!value) {
			this.array[byteIndex] |= 1 << offset;
		} else {
			this.array[byteIndex] &= ~(1 << offset);
		}
	}

	/**
	 * Makes a new Truncated form of this BitArray
	 * @param length The length to truncate to
	 * @returns A truncated BitArray
	 */
	trunc(length: number): BitArray {
		let out = new BitArray(length);

		for (let i = 0; i < Math.min(this.length, length); i++) {
			out.setBit(i, this.getBit(i));
		}

		return out;
	}

	/**
	 * Converts the BitArray to a string
	 * @param encoding The encoding to use
	 * @returns A string
	 */
	toString(encoding: "hex" | "utf8" = "hex"): string {
		return Buffer.from(this.array).toString(encoding);
	}
}
