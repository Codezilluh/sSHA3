import { Bench } from "tinybench";
import { Keccak } from "ssha3";
import { Keccak as AltKeccak } from "sha3";
import js_sha3 from "js-sha3";

const { keccak512 } = js_sha3;

const bench = new Bench({
	name: "Performance comparison of SHA3 alternatives",
	time: 100
});
const string =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices, diam a congue convallis, ex leo varius magna, consectetur tempor lorem ipsum id arcu. Duis purus ante, vestibulum vel nisi a, dapibus efficitur velit. Mauris metus dolor, varius sed commodo tristique, tincidunt sed lacus. Fusce non libero augue. Vivamus feugiat, odio eu vestibulum eleifend, purus purus bibendum ipsum, id vestibulum augue dolor vel quam.";

bench
	.add("sSHA3: Keccak-512", () => {
		const hasher = new Keccak(512);

		hasher.hash(string);
	})
	.add("SHA3: Keccak-512", () => {
		const hasher = new AltKeccak(512);

		hasher.update(string);
		hasher.digest();
	})
	.add("js-sha3: Keccak-512", () => {
		const hasher = keccak512.create();

		hasher.update(string);
		hasher.arrayBuffer();
	});

await bench.run();

console.log(bench.name);
console.table(bench.table());
