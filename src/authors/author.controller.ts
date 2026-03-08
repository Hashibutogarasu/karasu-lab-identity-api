import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AuthorService } from './author.service.js';
import { UserResponseDto } from '../blogs/dto/user-response.dto.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';

@UseGuards(RolesGuard)
@ApiTags('Authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  /**
   * List all authors.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'List all authors' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of authors.',
    type: [UserResponseDto],
  })
  @Get()
  async listAuthors() {
    return this.authorService.listAuthors();
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
