import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { z } from 'zod';
import type { ZodSchema } from 'zod';
import type { Request } from 'express';

import { basePaginationQuerySchema } from '../dto/pagination-query.dto.js';

function resolveFieldMeta(fieldType: z.ZodTypeAny): {
  type: typeof String | typeof Number | typeof Boolean;
  required: boolean;
  description?: string;
} {
  let current: z.ZodTypeAny = fieldType;
  let required = true;

  for (;;) {
    if (current instanceof z.ZodOptional) {
      required = false;
      current = current.unwrap() as z.ZodTypeAny;
    } else if (current instanceof z.ZodDefault) {
      required = false;
      current = current.removeDefault() as z.ZodTypeAny;
    } else {
      break;
    }
  }

  if (current instanceof z.ZodNumber) return { type: Number, required };
  if (current instanceof z.ZodBoolean) return { type: Boolean, required };
  if (current instanceof z.ZodEnum) {
    const values = Object.values(current.enum as Record<string, string>).join(
      ' | ',
    );
    return { type: String, required, description: values };
  }
  return { type: String, required };
}

function applyApiQueryDecorators(
  schema: ZodSchema,
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void {
  if (!(schema instanceof z.ZodObject)) return;

  for (const [name, fieldType] of Object.entries(
    schema.shape as Record<string, z.ZodTypeAny>,
  )) {
    const { type, required, description } = resolveFieldMeta(fieldType);
    const decorator = ApiQuery({
      name,
      required,
      type,
      ...(description ? { description } : {}),
    });
    (decorator as MethodDecorator)(target, propertyKey, descriptor);
  }
}

const extractPagination = createParamDecorator(
  (schema: ZodSchema | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const resolved = schema ?? basePaginationQuerySchema;
    const result = resolved.safeParse(request.query);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return result.data;
  },
);

/**
 * Parameter decorator that extracts, validates and documents pagination query parameters.
 *
 * Without an argument, validates against the base schema (`limit`, `cursor`).
 * Pass a custom Zod object schema to extend or replace the default fields — all
 * fields in the schema are automatically registered as `@ApiQuery()` entries so
 * they appear in the Swagger UI.
 *
 * @example
 * async listItems(@Pagination() query: BasePaginationQueryDto) {}
 *
 * @example
 * async listBlogs(@Pagination(listBlogsQuerySchema) query: ListBlogsQueryDto) {}
 */
export function Pagination(schema?: ZodSchema): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    extractPagination(schema)(target, propertyKey, parameterIndex);

    if (propertyKey !== undefined) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target,
        propertyKey as string,
      );
      if (descriptor) {
        applyApiQueryDecorators(
          schema ?? basePaginationQuerySchema,
          target,
          propertyKey,
          descriptor,
        );
      }
    }
  };
}
