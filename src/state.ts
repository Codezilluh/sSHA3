import BitArray from "./bitarray";

export type StateSize = {
	w: number;
	l: number;
};

export class StateArray {
	/** The backing byte string for this state array */
	string: BitArray;
	/** The size of the state */
	size: StateSize;

	constructor(size: StateSize) {
		// create a "5-by-5-by-w" array of bits
		this.string = new BitArray(size.w * 5 * 5);
		this.size = size;
	}

	/**
	 * Gets the size of a state for a given number of bits
	 * @param b The number of bits
	 * @returns A width and a length
	 */
	static getStateSize(b: number): StateSize {
		return { w: b / 25, l: Math.log2(b / 25) };
	}

	/**
	 * Converts a 3d point to an index in the flat bit array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @returns The index of the bit in the array
	 */
	private getBitIndex(x: number, y: number, z: number): number {
		return this.size.w * (5 * y + x) + z;
	}

	/**
	 * Returns the value of a bit at a given 3d point in the array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @returns The value of the bit
	 */
	getBit(x: number, y: number, z: number): number {
		let bitIndex = this.getBitIndex(x, y, z);

		return this.string.getBit(bitIndex);
	}

	/**
	 * Sets the value of a bit at a given 3d point in the array
	 * @param x The x position
	 * @param y The y position
	 * @param z The z position
	 * @param value The value of the bit
	 */
	setBit(x: number, y: number, z: number, value: number | boolean) {
		let bitIndex = this.getBitIndex(x, y, z);

		this.string.setBit(bitIndex, value);
	}
}
