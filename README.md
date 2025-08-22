# sSHA3

###### (the "s" is for shi- I mean slow)

A TypeScript implementation of Keccak permutation and SHA3 algorithm as described in [NIST FIPS 202](https://doi.org/10.6028/NIST.FIPS.202). The purpose of this was to familiarize myself with SHA3, as a result the code matches the standard specifications really closely. I didn't attempt any optimizations or major changes, I'll save that for a future exercise.

## Performance

Check out the benchmark code (it's very simple) in the [benchmarks folder](https://github.com/Codezilluh/sSHA3/tree/main/benchmarks) of this repository. Performance isn't _too_ bad, we get about 32 operations per second and the alternatives are only getting around 20-90k.


| Task name             | Throughput avg (ops/s) | Samples |
| --------------------- | ---------------------- | ------- |
| * sSHA3: Keccak-512     | 32 ± 0.47%             | 64      |
| SHA3: Keccak-512      | 20437 ± 0.56%          | 1974    |
| js-sha3: Keccak-512   | 90184 ± 0.09%          | 8961    |


## Installation

It isn't published on NPM and I don't recommend you actually use it, but install it with this command.

```shell
npm i github:Codezilluh/ssha3
```

## Usage

All of the classes are derived from a similar class and they share the same `hash(value)` method. I invite you to look at the code in `src/index.ts` for complete information about available classes and their options.

```js
import { Keccak, SHA3, SHA3_256 } from "ssha3";

// all options are optional, these are the default values for the Keccak and SHA3 class
// width always defaults to 1600, the rate is a function of width and size by default.
const hasher = new Keccak(512, {
	width: 1600, // permutation width
	rate: 576 // sponge rate
});

// you can customize the hash size
const hasher2 = new SHA3(384);

// SHA3_256() is equivalent to doing SHA3(256)
// there are many other classes like SHA3_256 (Keccak_224, SHA3_384, SHA3_512, etc.)
const hasher3 = new SHA3_256({ width: 1600 });

// the hash function returns a Buffer object
// it accepts either a string or a Uint8Array/Buffer
const buf = hasher.hash("some text");

buf.toString("hex"); // Result: 8411b0cf25a...
```
