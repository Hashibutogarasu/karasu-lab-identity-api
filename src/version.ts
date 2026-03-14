import { createRequire } from "module";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const getPkg = (): { version: string } => {
	const paths = [join(__dirname, "../package.json"), join(__dirname, "../../package.json")];
	for (const p of paths) {
		if (existsSync(p)) {
			try {
				return require(p) as { version: string };
			} catch {
				continue;
			}
		}
	}
	return { version: process.env.npm_package_version || "unknown" };
};

const pkg = getPkg();
export const packageVersion: string = pkg.version;
