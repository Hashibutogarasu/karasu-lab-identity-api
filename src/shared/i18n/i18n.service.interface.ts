
export interface II18nService {
	translate(key: string, options?: any): string;
	setLanguage(lang: string): Promise<void>;
	getCurrentLanguage(): string;
}

export const II18nService = Symbol('II18nService');
