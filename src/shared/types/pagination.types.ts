/**
 * Generic paginated result wrapper supporting both offset-based and cursor-based pagination.
 *
 * - `total` / `totalPages` / `page` are kept for legacy compatibility and may be `null`
 *   when cursor-based pagination is used.
 * - `nextCursor` is populated when there are more results available.
 * - `hasMore` indicates whether a next page exists.
 */
export interface PaginatedResult<T> {
	data: T[];
	total: number | null;
	page: number | null;
	limit: number;
	totalPages: number | null;
	nextCursor: string | null;
	hasMore: boolean;
}
