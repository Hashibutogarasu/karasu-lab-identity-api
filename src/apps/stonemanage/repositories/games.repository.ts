import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../shared/repository/abstract.repository.js';
import { IFirebaseAdminProvider } from '../../../shared/firebase/firebase-admin.provider.interface.js';
import { GameEntity } from '../entities/game.entity.js';

@Injectable()
export class GamesRepository extends AbstractRepository<GameEntity> {
  constructor(firebase: IFirebaseAdminProvider) {
    super(firebase, 'games');
  }

  /**
   * Finds all games associated with a specific user ID.
   * @param userId The ID of the user.
   * @returns A promise resolving to an array of game entities.
   */
  async findByUserId(userId: string): Promise<GameEntity[]> {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => this.mapDoc(doc));
  }

  /**
   * Finds games for a user with cursor-based pagination.
   * @param userId The ID of the user.
   * @param options Pagination options (limit, cursor).
   */
  findByUserIdPaged(userId: string, options: { limit: number; cursor?: string }) {
    const query = this.collection.where('userId', '==', userId).orderBy('createdAt', 'desc');
    return this.paginate(query, options);
  }

  /**
   * Deletes all games associated with a specific user ID.
   * @param userId The ID of the user.
   * @returns A promise that resolves when all games are deleted.
   */
  async deleteByUserId(userId: string): Promise<void> {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    const batch = this.firebase.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
