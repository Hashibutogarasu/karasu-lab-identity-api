import i18next from 'i18next';
const en = require('../../i18n/locales/en.json');
const ja = require('../../i18n/locales/ja.json');

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
