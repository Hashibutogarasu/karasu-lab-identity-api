import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../shared/repository/abstract.repository.js';
import { IFirebaseAdminProvider } from '../../../shared/firebase/firebase-admin.provider.interface.js';
import { LogEntity } from '../entities/log.entity.js';

@Injectable()
export class LogsRepository extends AbstractRepository<LogEntity> {
  constructor(firebase: IFirebaseAdminProvider) {
    super(firebase, 'logs');
  }

  async findByStoneId(stoneId: string): Promise<LogEntity[]> {
    const snapshot = await this.collection.where('stoneId', '==', stoneId).get();
    return snapshot.docs.map((doc) => this.mapDoc(doc));
  }

  async deleteByStoneId(stoneId: string): Promise<void> {
    const snapshot = await this.collection.where('stoneId', '==', stoneId).get();

    const batch = this.firebase.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  /**
   * Finds logs for a stone with cursor-based pagination.
   * @param stoneId The ID of the stone.
   * @param options Pagination options (limit, cursor).
   */
  findByStoneIdPaged(stoneId: string, options: { limit: number; cursor?: string }) {
    const query = this.collection.where('stoneId', '==', stoneId).orderBy('createdAt', 'desc');
    return this.paginate(query, options);
  }
}
