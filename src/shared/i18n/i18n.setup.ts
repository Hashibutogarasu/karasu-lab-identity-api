import i18next from 'i18next';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadLocale = (lang: string) => {
    return JSON.parse(readFileSync(join(__dirname, `../../i18n/locales/${lang}.json`), 'utf-8'));
};

const en = loadLocale('en');
const ja = loadLocale('ja');

let initPromise: Promise<any> | null = null;

export const setupI18n = async (): Promise<void> => {
    if (initPromise !== null) {
        await initPromise;
        return;
    }

    initPromise = i18next.init({
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

    await initPromise;
};
