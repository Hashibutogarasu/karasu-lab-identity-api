import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import { ErrorCodes } from '../errors/error.codes.js';

@Injectable()
export class DocsAuthMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService<BetterAuthType>) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const session = await this.authService.instance.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session) {
			throw ErrorCodes.SYSTEM.OPENAPI_UNAUTHORIZED;
		}
		next();
	}
}
