import { SHA3, SHA3_224, SHA3_256, SHA3_384, SHA3_512, Keccak, Keccak_224, Keccak_256, Keccak_384, Keccak_512 } from "../lib/index.js";

let ipsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia velit sed ex pulvinar hendrerit. Morbi vitae nisl sed nisl mollis porta. Sed fringilla nisl id metus porta, eu suscipit ipsum ultrices. Vivamus pretium accumsan sollicitudin. Morbi viverra sem id nunc sagittis euismod. Fusce sagittis ornare orci, a mollis mauris laoreet eu. In molestie, lorem id bibendum imperdiet, diam nulla mattis leo, a sodales justo felis quis nibh. Suspendisse at elit efficitur, feugiat ligula a, aliquam ipsum. Cras mollis nibh vitae felis egestas suscipit. Morbi rutrum nisl quis lectus ultrices, non congue sem hendrerit. Vestibulum at dolor vulputate, gravida lorem sit amet, molestie felis. ";
let unicode = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 😃 Vestibulum ac malesuada erat. Curabitur lacinia—cras varius—turpis ut ultricies. Phasellus congue, ñandú y café, augue non fringilla. Привет мир! こんにちは世界 🌏 Δοκιμή με ελληνικούς χαρακτήρες και emojis 👍  
مرحبا بالعالم 🌙 ‘single quotes’∑, √, ∞, π, ≈, ≤, ≥`;

test("Proper result from default SHA3", () => {
	let alg = new SHA3();

	expect(alg.hash("testing the algorithm").toString("hex").toLowerCase()).toBe(
		"3bb9939964d82aea87cb00ad5f9054eb749c2886aaa96fc1d9b10812f4ac2fe0e7f9e2d40a74f9fc538616ffc19bc8a82a24d5f771eb2744083a12cfce828444"
	);
});

test("Proper result from SHA3-224", () => {
	let alg = new SHA3_224();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe("3daedcda13f1d93787ff4f8ac0edc23c4599ae731644c9b9d692e6bb");
});

test("Proper result from SHA3-256", () => {
	let alg = new SHA3_256();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe("7556b19944340f7baec2e6f975eacea0b191b67b4c8e4cfbbf508df1f4a46b7a");
});

test("Proper result from SHA3-384", () => {
	let alg = new SHA3_384();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe(
		"7648e1eeaf52d6d9858b1041d230d18a79e0fc5a820f1a25096bc7c040473ced734f745400a3571a0f8df87c4f13d7e2"
	);
});

test("Proper result from SHA3-512", () => {
	let alg = new SHA3_512();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe(
		"d1f3aa5a677f3086b969e3af68ff49e0cfc03acd5d57b491e2ba217a911bd2cfa08410bc82ac863a055f0f6a34453471c38777a1f2717e7563791597696695e0"
	);
});

test("Proper result from default Keccak", () => {
	let alg = new Keccak();

	expect(alg.hash("testing the algorithm").toString("hex").toLowerCase()).toBe(
		"b4d920562363ecfd451049a978be92fc7b6ae0601ea49740f8aad82280ab02b82fa6bafb7345526341853758a93e50b490d09383ad05d48cdfd35c4e82e25fac"
	);
});

test("Proper result from Keccak-224", () => {
	let alg = new Keccak_224();

	expect(alg.hash("testing the algorithm").toString("hex").toLowerCase()).toBe("4f8b832803173078bce1538627e68a8e066db25ede505778a2fc18d6");
});

test("Proper result from Keccak-256", () => {
	let alg = new Keccak_256();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe("ef88de345aaa673845e972de5c2431c294f8734edb6907fc8e4f70d50de961e7");
});

test("Proper result from Keccak-384", () => {
	let alg = new Keccak_384();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe(
		"2f733e4210bf9c30aee7a6a6fc75e1fdff223bd0be3062f076752db7aebff8a177c01ceb7da84a0dd3c5135785e690d9"
	);
});

test("Proper result from Keccak-512", () => {
	let alg = new Keccak_512();

	expect(alg.hash(ipsum).toString("hex").toLowerCase()).toBe(
		"9885ebe11be4d8ad41bb9818f9e2d135d8c67cc4ee57f63011437ea0f92828fe13d3d8e630eb0b9c9a23501e71ba41fb966167e1fbae8b51e40a344ea756367f"
	);
});

test("Changing output size", () => {
	let options = { width: 1600, rate: 1000 };

	let sizes = [128, 512];

	let small = new Keccak(sizes[0], options);
	let large = new Keccak(sizes[1], options);

	expect(
		large
			.hash(ipsum)
			.subarray(0, sizes[0] / 8)
			.toString("hex")
	).toBe(small.hash(ipsum).toString("hex"));
});

test("Unicode support", () => {
	let alg = new SHA3();

	expect(alg.hash(unicode).toString("hex")).toBe(
		"a9f2e124b387213e9a327f06db94c65dcd0d1e7867f5106df4890e8e3a1458d04dc2dc2acbd149e1edbcd05f34cdda71dbda059ffcda8b2a991401cf9edf7031"
	);
});
