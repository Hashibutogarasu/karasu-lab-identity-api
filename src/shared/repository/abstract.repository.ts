import { DocumentSnapshot, FieldValue } from 'firebase-admin/firestore';
import { IRepository } from './repository.interface.js';
import { IFirebaseAdminProvider } from '../firebase/firebase-admin.provider.interface.js';

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
    const toDate = (val: unknown): Date =>
      val != null && typeof (val as { toDate?: unknown }).toDate === 'function'
        ? (val as { toDate(): Date }).toDate()
        : (val as Date);

    return {
      ...data,
      id: doc.id,
      createdAt: toDate(data?.createdAt),
      updatedAt: toDate(data?.updatedAt),
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
}
