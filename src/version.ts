import { createRequire } from "module";

const require = createRequire(import.meta.url);

interface Package {
	name: string;
	version: string;
}

const getPkg = (): Package => {
	try {
		const pkg = require("../../package.json") as Package;
		if (pkg.name === "karasu-lab-api") return pkg;
		throw new Error();
	} catch {
		return require("../package.json") as Package;
	}
};

export const packageVersion: string = getPkg().version;
