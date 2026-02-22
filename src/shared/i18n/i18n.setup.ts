import i18next from 'i18next';
import en from '../../i18n/locales/en.json';
import ja from '../../i18n/locales/ja.json';

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
