import { DocumentSnapshot, FieldValue, Query } from 'firebase-admin/firestore';
import { IRepository } from './repository.interface.js';
import { IFirebaseAdminProvider } from '../firebase/firebase-admin.provider.interface.js';
import { toDateString } from '../../utils/date.util.js';

/**
 * Abstract implementation of a Firestore repository.
 * Provides basic CRUD operations mapping to a specific collection.
 */
export abstract class AbstractRepository<T> implements IRepository<T> {
  /**
   * Initializes the repository.
   * @param firebase The Firebase admin provider instance.
   * @param collectionName The name of the Firestore collection.
   */
  constructor(
    protected readonly firebase: IFirebaseAdminProvider,
    protected readonly collectionName: string,
  ) {}

  /**
   * Returns a reference to the underlying Firestore collection.
   */
  protected get collection() {
    return this.firebase.db.collection(this.collectionName);
  }

  /**
   * Maps a Firestore DocumentSnapshot to an entity of type T.
   * Automatically handles id and Date conversions for createdAt and updatedAt.
   * @param doc The DocumentSnapshot to map.
   */
  protected mapDoc(doc: DocumentSnapshot): T {
    const data = doc.data();

    return {
      ...data,
      id: doc.id,
      createdAt: toDateString(data?.createdAt),
      updatedAt: toDateString(data?.updatedAt),
    } as unknown as T;
  }

  /**
   * Creates a new document in the collection with the specified ID.
   * Optionally tracks createdAt and updatedAt fields.
   * @param id The ID for the new document.
   * @param data The initial data.
   */
  async create(id: string, data: Partial<T>): Promise<T> {
    const now = FieldValue.serverTimestamp();
    const docData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.doc(id).set(docData);
    const doc = await this.collection.doc(id).get();
    return this.mapDoc(doc);
  }

  /**
   * Retrieves a document by its ID.
   * @param id Document ID to retrieve.
   */
  async getById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return this.mapDoc(doc);
  }

  /**
   * Updates an existing document natively with partial data.
   * Automatically updates the updatedAt timestamp.
   * @param id The ID of the document to update.
   * @param data Partial data to update.
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await this.collection.doc(id).update(updateData);
    const updatedDoc = await this.collection.doc(id).get();
    return this.mapDoc(updatedDoc);
  }

  /**
   * Deletes a document by its ID.
   * @param id Document ID to delete.
   */
  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  /**
   * Cursor-based pagination helper for Firestore queries.
   *
   * Fetches `limit + 1` documents to determine whether a next page exists.
   * Returns at most `limit` documents along with a `nextCursor` pointing to the
   * last returned document ID (or `null` if no further pages exist).
   *
   * @param query  The Firestore query (with `orderBy` applied before calling this).
   * @param options.limit   Maximum number of items to return (must be >= 1).
   * @param options.cursor  Optional document ID to start after (exclusive).
   */
  protected async paginate(
    query: Query,
    options: { limit: number; cursor?: string },
  ): Promise<{ data: T[]; nextCursor: string | null; hasMore: boolean }> {
    const limit = Number(options.limit) || 20;
    const { cursor } = options;

    let paginatedQuery = query;
    if (cursor) {
      const cursorSnap = await this.collection.doc(cursor).get();
      if (cursorSnap.exists) {
        paginatedQuery = paginatedQuery.startAfter(cursorSnap);
      }
    }

    paginatedQuery = paginatedQuery.limit(limit + 1);
    const snapshot = await paginatedQuery.get();
    const docs = snapshot.docs;

    const hasMore = docs.length > limit;
    const resultDocs = hasMore ? docs.slice(0, limit) : docs;
    const data = resultDocs.map((doc) => this.mapDoc(doc));
    const nextCursor = hasMore ? resultDocs[resultDocs.length - 1].id : null;

    return { data, nextCursor, hasMore };
  }
}
