export const customMatchers = {
	toThrowError: (received: any, expected: string): jest.CustomMatcherResult => {
		const result = { pass: false, message: () => "" };
		let threw = false;
		let thrown!: Error;

		if (typeof received !== "function") {
			throw new Error("Actual is not a Function");
		}

		try {
			received();
		} catch (e: any) {
			threw = true;
			thrown = e;
		}

		if (!threw) {
			result.message = () => "Expected function to throw an exception.";
			return result;
		}
		if (!(thrown instanceof Error)) {
			result.message = () => "Expected function to throw an Error";
			return result;
		}

		if (expected == null) {
			result.pass = true;
			result.message = () => "Expected function not to throw, but it threw " + ".";
			return result;
		}

		if (thrown.name === expected) {
			result.pass = true;
		}

		return result;
	}
};
