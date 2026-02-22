
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { II18nService } from './i18n.service.interface.js';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
	constructor(
		@Inject(II18nService) private readonly i18nService: II18nService
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const lang = req.headers['accept-language']?.split(',')[0] || 'en';
		await this.i18nService.setLanguage(lang);
		next();
	}
}
