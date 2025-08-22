type Options = {
    /** The width of the permutation (in bits) */
    width?: number;
    /** The sponge function rate (in bits) */
    rate?: number;
};
declare class Hasher {
    /**
     * Creates a new Hasher
     * @param size The size of the output (in bits)
     * @param options The options for the Hasher
     * @param sha Whether to use SHA3 padding or not
     */
    constructor(size?: number, options?: Options, sha?: boolean);
    /**
     * Computes the hash of a given value
     * @param value The value to hash (string or Buffer)
     * @returns A Buffer representation of the hash result
     */
    hash(value: string | Uint8Array): Buffer;
}
export class SHA3 extends Hasher {
    /**
     * Creates a new Hasher using SHA3 padding
     * @param size The size of the output (in bits)
     * @param options The options for the hash
     */
    constructor(size?: number, options?: Options);
}
export class SHA3_224 extends SHA3 {
    /**
     * Creates a new 224-bit Hasher using SHA3 padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class SHA3_256 extends SHA3 {
    /**
     * Creates a new 256-bit Hasher using SHA3 padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class SHA3_384 extends SHA3 {
    /**
     * Creates a new 384-bit Hasher using SHA3 padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class SHA3_512 extends SHA3 {
    /**
     * Creates a new 512-bit Hasher using SHA3 padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class Keccak extends Hasher {
    /**
     * Creates a new Hasher using Keccak padding
     * @param size The size of the output (in bits)
     * @param options The options for the hash
     */
    constructor(size?: number, options?: Options);
}
export class Keccak_224 extends Keccak {
    /**
     * Creates a new 224-bit Hasher using Keccak padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class Keccak_256 extends Keccak {
    /**
     * Creates a new 256-bit Hasher using Keccak padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class Keccak_384 extends Keccak {
    /**
     * Creates a new 384-bit Hasher using Keccak padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}
export class Keccak_512 extends Keccak {
    /**
     * Creates a new 512-bit Hasher using Keccak padding
     * @param options The options for the hash
     */
    constructor(options?: Options);
}

//# sourceMappingURL=index.d.ts.map
