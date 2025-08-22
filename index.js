class $cbe615112f19ec61$export$2e2bcd8739ae039 {
    array;
    length;
    constructor(length){
        this.length = length;
        this.array = new Uint8Array(Math.ceil(length / 8));
    }
    /**
	 * Performs a concat operation on two BitArrays to make one larger BitArray.
	 * @param A The first BitArray
	 * @param B The second BitArray
	 * @returns A new BitArray
	 */ static concat(A, B) {
        let C = new $cbe615112f19ec61$export$2e2bcd8739ae039(A.length + B.length);
        for(let i = 0; i < A.length; i++)C.setBit(i, A.getBit(i));
        for(let i = 0; i < B.length; i++)C.setBit(i + A.length, B.getBit(i));
        return C;
    }
    /**
	 * Performs a XOR operation on two BitArrays to make a new BitArray.
	 * @param A The first BitArray
	 * @param B The second BitArray
	 * @returns A new BitArray
	 */ static xor(A, B) {
        let C = new $cbe615112f19ec61$export$2e2bcd8739ae039(Math.min(A.length, B.length));
        for(let i = 0; i < C.length; i++)C.setBit(i, A.getBit(i) ^ B.getBit(i));
        return C;
    }
    /**
	 * Generates a new BitArray from an input string, array of bits, or Uint8Array
	 * @param input The input to generate from
	 * @returns A new BitArray
	 */ static from(input) {
        if (Array.isArray(input)) {
            let out = new $cbe615112f19ec61$export$2e2bcd8739ae039(input.length);
            input.forEach((bit, i)=>{
                out.setBit(i, !!bit);
            });
            return out;
        }
        let array;
        if (input instanceof Uint8Array) array = input;
        else array = Buffer.from(input, "utf-8");
        let out = new $cbe615112f19ec61$export$2e2bcd8739ae039(array.length * 8);
        out.array = array;
        return out;
    }
    /**
	 * Gets the value of a bit at a given index
	 * @param index The bit index to get
	 * @returns The bit value
	 */ getBit(index) {
        if (index >= this.length) throw new Error("Index out of range!");
        let byteIndex = Math.floor(index / 8);
        let offset = index % 8;
        return this.array[byteIndex] >> offset & 1;
    }
    /**
	 * Sets the value of a bit at a given index
	 * @param index The bit index to set
	 * @param value The bit value
	 */ setBit(index, value) {
        if (index >= this.length) throw new Error("Index out of range!");
        let byteIndex = Math.floor(index / 8);
        let offset = index % 8;
        if (!!value) this.array[byteIndex] |= 1 << offset;
        else this.array[byteIndex] &= ~(1 << offset);
    }
    /**
	 * Makes a new Truncated form of this BitArray
	 * @param length The length to truncate to
	 * @returns A truncated BitArray
	 */ trunc(length) {
        let out = new $cbe615112f19ec61$export$2e2bcd8739ae039(length);
        for(let i = 0; i < Math.min(this.length, length); i++)out.setBit(i, this.getBit(i));
        return out;
    }
    /**
	 * Converts the BitArray to a string
	 * @param encoding The encoding to use
	 * @returns A string
	 */ toString(encoding = "hex") {
        return Buffer.from(this.array).toString(encoding);
    }
}




class $94cfa2cfccc8cc22$export$e6e0067a740f27e5 {
    /** The backing byte string for this state array */ string;
    /** The size of the state */ size;
    constructor(size){
        // create a "5-by-5-by-w" array of bits
        this.string = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(size.w * 25);
        this.size = size;
    }
    /**
	 * Gets the size of a state for a given number of bits
	 * @param b The number of bits
	 * @returns A width and a length
	 */ static getStateSize(b) {
        return {
            w: b / 25,
            l: Math.log2(b / 25)
        };
    }
    /**
	 * Converts a 3d point to an index in the flat bit array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @returns The index of the bit in the array
	 */ getBitIndex(x, y, z) {
        return this.size.w * (5 * y + x) + z;
    }
    /**
	 * Returns the value of a bit at a given 3d point in the array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @returns The value of the bit
	 */ getBit(x, y, z) {
        let bitIndex = this.getBitIndex(x, y, z);
        return this.string.getBit(bitIndex);
    }
    /**
	 * Sets the value of a bit at a given 3d point in the array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @param value The value of the bit
	 */ setBit(x, y, z, value) {
        let bitIndex = this.getBitIndex(x, y, z);
        this.string.setBit(bitIndex, value);
    }
}


/**
 * Performs a modulo operation on two numbers
 * @param n The dividend
 * @param d The divisor
 * @returns The result of modulo
 */ function $f706fc4090958afb$var$mod(n, d) {
    return (n % d + d) % d;
}
/**
 * XOR each bit in the state with the parities of two columns in the array.
 * @param A The state array
 * @returns The altered state array
 */ function $f706fc4090958afb$var$theta(A) {
    const C = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    const D = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    const out = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    for(let x = 0; x < 5; x++)for(let z = 0; z < A.size.w; z++){
        let value = A.getBit(x, 0, z) ^ A.getBit(x, 1, z) ^ A.getBit(x, 2, z) ^ A.getBit(x, 3, z) ^ A.getBit(x, 4, z);
        C.setBit(x, 0, z, value);
    }
    for(let x = 0; x < 5; x++)for(let z = 0; z < A.size.w; z++){
        let value = C.getBit($f706fc4090958afb$var$mod(x - 1, 5), 0, z) ^ C.getBit($f706fc4090958afb$var$mod(x + 1, 5), 0, $f706fc4090958afb$var$mod(z - 1, A.size.w));
        D.setBit(x, 0, z, value);
    }
    for(let x = 0; x < 5; x++){
        for(let y = 0; y < 5; y++)for(let z = 0; z < A.size.w; z++){
            let value = A.getBit(x, y, z) ^ D.getBit(x, 0, z);
            out.setBit(x, y, z, value);
        }
    }
    return out;
}
/**
 * Rotate the bits of each lane by a length, called the offset, which depends on the fixed x and y coordinates of the lane.
 * @param A The state array
 * @returns The altered state array
 */ function $f706fc4090958afb$var$rho(A) {
    const out = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    for(let z = 0; z < A.size.w; z++){
        let value = A.getBit(0, 0, z);
        out.setBit(0, 0, z, value);
    }
    let x = 1, y = 0;
    for(let t = 0; t < 24; t++){
        for(let z = 0; z < A.size.w; z++){
            let value = A.getBit(x, y, $f706fc4090958afb$var$mod(z - (t + 1) * (t + 2) / 2, A.size.w));
            out.setBit(x, y, z, value);
        }
        [x, y] = [
            y,
            $f706fc4090958afb$var$mod(2 * x + 3 * y, 5)
        ];
    }
    return out;
}
/**
 * Rearrange the positions of the lanes.
 * @param A The state array
 * @returns The altered state array
 */ function $f706fc4090958afb$var$pi(A) {
    const out = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    for(let x = 0; x < 5; x++){
        for(let y = 0; y < 5; y++)for(let z = 0; z < A.size.w; z++){
            let value = A.getBit($f706fc4090958afb$var$mod(x + 3 * y, 5), x, z);
            out.setBit(x, y, z, value);
        }
    }
    return out;
}
/**
 * XOR each bit with a non-linear function of two other bits in its row.
 * @param A The state array
 * @returns The altered state array
 */ function $f706fc4090958afb$var$chi(A) {
    const out = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    for(let x = 0; x < 5; x++){
        for(let y = 0; y < 5; y++)for(let z = 0; z < A.size.w; z++){
            let value = A.getBit(x, y, z) ^ (1 ^ A.getBit($f706fc4090958afb$var$mod(x + 1, 5), y, z)) & A.getBit($f706fc4090958afb$var$mod(x + 2, 5), y, z);
            out.setBit(x, y, z, value);
        }
    }
    return out;
}
/**
 * Computes a round constant using a linear feedback shift register.
 * @param t An integer
 * @returns Generated bit
 */ function $f706fc4090958afb$var$rc(t) {
    if ($f706fc4090958afb$var$mod(t, 255) === 0) return 1;
    let R = 1;
    for(let i = 0; i < $f706fc4090958afb$var$mod(t, 255); i++)if (R & 0x80) R = (R << 1 ^ 0x71) & 0xff;
    else R <<= 1;
    return R & 1;
}
/**
 * Modify some of the bits of Lane(0, 0) in a manner that depends on the round index, i.
 * @param A The state array
 * @param i A round index
 * @returns The altered state array
 */ function $f706fc4090958afb$var$iota(A, i) {
    let out = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)(A.size);
    for(let x = 0; x < 5; x++){
        for(let y = 0; y < 5; y++)for(let z = 0; z < A.size.w; z++){
            let value = A.getBit(x, y, z);
            out.setBit(x, y, z, value);
        }
    }
    let RC = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(A.size.w);
    for(let j = 0; j <= A.size.l; j++)RC.setBit(Math.pow(2, j) - 1, $f706fc4090958afb$var$rc(j + 7 * i));
    for(let z = 0; z < A.size.w; z++){
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
 */ function $f706fc4090958afb$var$rnd(A, i) {
    return $f706fc4090958afb$var$iota($f706fc4090958afb$var$chi($f706fc4090958afb$var$pi($f706fc4090958afb$var$rho($f706fc4090958afb$var$theta(A)))), i);
}
/**
 * Applies Keccak permutation to a string
 * @param S The string to process
 * @param b The length of the string
 * @param nr The number of rounds (optional)
 * @returns The altered string
 */ function $f706fc4090958afb$var$keccak(S, b, nr) {
    let A = new (0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5)((0, $94cfa2cfccc8cc22$export$e6e0067a740f27e5).getStateSize(b));
    let x = 12 + A.size.l * 2;
    let n = nr ?? x;
    A.string = S;
    for(let i = x - n; i < x; i++)A = $f706fc4090958afb$var$rnd(A, i);
    return A.string;
}
/**
 * Uses multi-rate padding to generate padding for a BitArray
 * @param x Rate
 * @param m Bits used
 * @param sha Whether to use SHA3 padding or default Keccak padding
 * @returns A BitArray
 */ function $f706fc4090958afb$var$pad(x, m, sha) {
    if (m < 0) throw new Error("Integer must not be negative");
    let headBits = sha ? [
        0,
        1,
        1,
        0
    ] : [
        1
    ];
    let extraBits = headBits.length + 1;
    let j = $f706fc4090958afb$var$mod(-m - extraBits, x);
    let arr = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(j + extraBits);
    headBits.forEach((bit, i)=>{
        arr.setBit(i, !!bit);
    });
    arr.setBit(arr.length - 1, true);
    return arr;
}
function $f706fc4090958afb$export$2e2bcd8739ae039(N, d, b, r, sha = false) {
    if (d < 0) throw new Error("Bit length must not be negative");
    let P = (0, $cbe615112f19ec61$export$2e2bcd8739ae039).concat(N, $f706fc4090958afb$var$pad(r, N.length, sha));
    let n = P.length / r;
    let c = b - r;
    let Ps = [];
    let S = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(b);
    for(let i = 0; i < n; i++){
        let temp = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(r + c);
        for(let k = 0; k < r; k++)temp.setBit(k, P.getBit(i * r + k));
        Ps.push(temp);
    }
    for(let i = 0; i < n; i++)S = $f706fc4090958afb$var$keccak((0, $cbe615112f19ec61$export$2e2bcd8739ae039).xor(S, Ps[i]), b);
    let Z = new (0, $cbe615112f19ec61$export$2e2bcd8739ae039)(0);
    while(true){
        Z = (0, $cbe615112f19ec61$export$2e2bcd8739ae039).concat(Z, S.trunc(r));
        if (d <= Z.length) return Z.trunc(d);
        S = $f706fc4090958afb$var$keccak(S, b);
    }
}


class $149c1bd638913645$var$Hasher {
    /** The width of the permutation (in bits) */ width;
    /** The size of the output (in bits) */ digestLen;
    /** The sponge function rate (in bits) */ rate;
    /** Whether to use SHA3 or default Keccak padding */ sha;
    /**
	 * Creates a new Hasher
	 * @param size The size of the output (in bits)
	 * @param options The options for the Hasher
	 * @param sha Whether to use SHA3 padding or not
	 */ constructor(size = 512, options = {}, sha = false){
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
	 */ hash(value) {
        let string = (0, $cbe615112f19ec61$export$2e2bcd8739ae039).from(value);
        return Buffer.from((0, $f706fc4090958afb$export$2e2bcd8739ae039)(string, this.digestLen, this.width, this.rate, this.sha).array);
    }
}
class $149c1bd638913645$export$fdefc4aff42d6049 extends $149c1bd638913645$var$Hasher {
    /**
	 * Creates a new Hasher using SHA3 padding
	 * @param size The size of the output (in bits)
	 * @param options The options for the hash
	 */ constructor(size = 512, options = {}){
        super(size, options, true);
    }
}
class $149c1bd638913645$export$209d0ce3382fa604 extends $149c1bd638913645$export$fdefc4aff42d6049 {
    /**
	 * Creates a new 224-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(224, options);
    }
}
class $149c1bd638913645$export$8b9bbcccfa732af8 extends $149c1bd638913645$export$fdefc4aff42d6049 {
    /**
	 * Creates a new 256-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(256, options);
    }
}
class $149c1bd638913645$export$f08a44f842df55a7 extends $149c1bd638913645$export$fdefc4aff42d6049 {
    /**
	 * Creates a new 384-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(384, options);
    }
}
class $149c1bd638913645$export$69c68eb943eb4cf6 extends $149c1bd638913645$export$fdefc4aff42d6049 {
    /**
	 * Creates a new 512-bit Hasher using SHA3 padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(512, options);
    }
}
class $149c1bd638913645$export$f7374b8b4498bc2e extends $149c1bd638913645$var$Hasher {
    /**
	 * Creates a new Hasher using Keccak padding
	 * @param size The size of the output (in bits)
	 * @param options The options for the hash
	 */ constructor(size = 512, options = {}){
        super(size, options, false);
    }
}
class $149c1bd638913645$export$275d92085f6d379a extends $149c1bd638913645$export$f7374b8b4498bc2e {
    /**
	 * Creates a new 224-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(224, options);
    }
}
class $149c1bd638913645$export$973d13ea5ba7605 extends $149c1bd638913645$export$f7374b8b4498bc2e {
    /**
	 * Creates a new 256-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(256, options);
    }
}
class $149c1bd638913645$export$f82bdd42b7a13cb5 extends $149c1bd638913645$export$f7374b8b4498bc2e {
    /**
	 * Creates a new 384-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(384, options);
    }
}
class $149c1bd638913645$export$a5b5cc248c0d4be6 extends $149c1bd638913645$export$f7374b8b4498bc2e {
    /**
	 * Creates a new 512-bit Hasher using Keccak padding
	 * @param options The options for the hash
	 */ constructor(options = {}){
        super(512, options);
    }
}


export {$149c1bd638913645$export$fdefc4aff42d6049 as SHA3, $149c1bd638913645$export$209d0ce3382fa604 as SHA3_224, $149c1bd638913645$export$8b9bbcccfa732af8 as SHA3_256, $149c1bd638913645$export$f08a44f842df55a7 as SHA3_384, $149c1bd638913645$export$69c68eb943eb4cf6 as SHA3_512, $149c1bd638913645$export$f7374b8b4498bc2e as Keccak, $149c1bd638913645$export$275d92085f6d379a as Keccak_224, $149c1bd638913645$export$973d13ea5ba7605 as Keccak_256, $149c1bd638913645$export$f82bdd42b7a13cb5 as Keccak_384, $149c1bd638913645$export$a5b5cc248c0d4be6 as Keccak_512};
//# sourceMappingURL=index.js.map
