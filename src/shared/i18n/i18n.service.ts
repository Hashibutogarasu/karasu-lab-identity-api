
import { Injectable } from '@nestjs/common';
import i18next from 'i18next';
import { II18nService } from './i18n.service.interface.js';
import { setupI18n } from './i18n.setup.js';

@Injectable()
export class I18nService implements II18nService {
	async init() {
		await setupI18n();
	}

	translate(key: string, options?: Record<string, unknown>): string {
		return i18next.t(key, options);
	}

	async setLanguage(lang: string): Promise<void> {
		await i18next.changeLanguage(lang);
	}

	getCurrentLanguage(): string {
		return i18next.language;
	}
}
