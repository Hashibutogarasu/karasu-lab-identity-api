import {
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AuthorService } from './author.service.js';
import { UserResponseDto } from '../blogs/dto/user-response.dto.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';
import { Pagination } from '../shared/decorators/pagination.decorator.js';
import { BasePaginationQueryDto } from '../shared/dto/pagination-query.dto.js';

/**
 * @deprecated Use AuthorsController (/api/authors) instead.
 */
@UseGuards(RolesGuard)
@ApiTags('Authors')
@Controller('author')
export class AuthorLegacyController {
  constructor(@Inject(AuthorService) private readonly authorService: AuthorService) {}

  /**
   * List all authors (no pagination).
   * @deprecated Use GET /authors instead.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'List all authors', deprecated: true })
  @ApiResponse({
    status: 200,
    description: '[Deprecated] Use GET /authors. Return a list of authors.',
    type: [UserResponseDto],
  })
  @Get()
  async listAuthors() {
    return this.authorService.listAuthors();
  }
}

@UseGuards(RolesGuard)
@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(@Inject(AuthorService) private readonly authorService: AuthorService) {}

  /**
   * List all authors with cursor-based pagination.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'List all authors' })
  @ApiResponse({
    status: 200,
    description: 'Return a paginated list of authors.',
    type: [UserResponseDto],
  })
  @Get()
  async listAuthors(@Pagination() query: BasePaginationQueryDto) {
    return this.authorService.listAuthorsPaged(query);
  }

  /**
   * Get an author by ID.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an author profile.',
    type: UserResponseDto,
  })
  @Get(':id')
  async getAuthor(@Param('id') id: string) {
    return this.authorService.getById(id);
  }
}
