/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import i18next from 'i18next';
import { readFileSync } from 'fs';
import { join } from 'path';

let initPromise: Promise<any> | null = null;
let initialized = false;

const loadLocale = (lang: string) => {
	const root = process.cwd();
	const possiblePaths = [
		join(root, 'dist/i18n/locales', `${lang}.json`),
		join(root, 'src/i18n/locales', `${lang}.json`),
		join(root, 'i18n/locales', `${lang}.json`),
	];

	for (const path of possiblePaths) {
		try {
			return JSON.parse(readFileSync(path, 'utf-8'));
		} catch {
			continue;
		}
	}
	throw new Error(`Locale file for ${lang} not found`);
};

export const setupI18n = async (): Promise<void> => {
	if (initialized) return;
	if (initPromise) return initPromise;

	initPromise = (async () => {
		const en = loadLocale('en');
		const ja = loadLocale('ja');

		await i18next.init({
			lng: 'en',
			fallbackLng: 'en',
			resources: {
				en: { translation: en },
				ja: { translation: ja },
			},
			interpolation: {
				escapeValue: false,
			},
		});
		initialized = true;
	})();

	return initPromise;
};
