import BitArray from "./bitarray";
import sponge from "./sponge";

type Options = {
	/** The width of the permutation (in bits) */
	width?: number;
	/** The sponge function rate (in bits) */
	rate?: number;
};

class Hasher {
	/** The width of the permutation (in bits) */
	private width: number;
	/** The size of the output (in bits) */
	private digestLen: number;
	/** The sponge function rate (in bits) */
	private rate: number;
	/** Whether to use SHA3 or default Keccak padding */
	private sha: boolean;

	/**
	 * Creates a new Hasher
	 * @param size The size of the output (in bits)
	 * @param options The options for the Hasher
	 * @param sha Whether to use SHA3 padding or not
	 */
	constructor(size: number = 512, options: Options = {}, sha = false) {
		this.digestLen = size;
		this.width = options.width ?? 1600;
		this.rate = options.rate ?? this.width - size * 2;
		this.sha = sha;

		if (this.rate < 0 || this.rate > this.width) throw new Error("Width is not large enough for given rate/size!");
	}

	/**
	 * Computes the hash of a given value
	 * @param value The value to hash (string or Buffer)
	 * @returns A Buffer representation of the hash result
	 */
	hash(value: string | Uint8Array): Buffer {
		let string = BitArray.from(value);

		return Buffer.from(sponge(string, this.digestLen, this.width, this.rate, this.sha).array);
	}
}

export class SHA3 extends Hasher {
	/**
	 * Creates a new Hasher using SHA3 padding
	 * @param size The size of the output (in bits)
	 * @param options The options for the hash
	 */
	constructor(size: number = 512, options: Options = {}) {
		super(size, options, true);
	}
}

export class SHA3_224 extends SHA3 {
	/**
	 * Creates a new 224-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(224, options);
	}
}

export class SHA3_256 extends SHA3 {
	/**
	 * Creates a new 256-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(256, options);
	}
}

export class SHA3_384 extends SHA3 {
	/**
	 * Creates a new 384-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(384, options);
	}
}

export class SHA3_512 extends SHA3 {
	/**
	 * Creates a new 512-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(512, options);
	}
}

export class Keccak extends Hasher {
	/**
	 * Creates a new Hasher using Keccak padding
	 * @param size The size of the output (in bits)
	 * @param options The options for the hash
	 */
	constructor(size: number = 512, options: Options = {}) {
		super(size, options, false);
	}
}

export class Keccak_224 extends Keccak {
	/**
	 * Creates a new 224-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(224, options);
	}
}

export class Keccak_256 extends Keccak {
	/**
	 * Creates a new 256-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(256, options);
	}
}

export class Keccak_384 extends Keccak {
	/**
	 * Creates a new 384-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(384, options);
	}
}

export class Keccak_512 extends Keccak {
	/**
	 * Creates a new 512-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */
	constructor(options: Options = {}) {
		super(512, options);
	}
}
