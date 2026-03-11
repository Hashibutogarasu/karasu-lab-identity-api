import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../shared/repository/abstract.repository.js';
import { IFirebaseAdminProvider } from '../../../shared/firebase/firebase-admin.provider.interface.js';
import { StoneEntity } from '../entities/stone.entity.js';

@Injectable()
export class StonesRepository extends AbstractRepository<StoneEntity> {
  constructor(firebase: IFirebaseAdminProvider) {
    super(firebase, 'stones');
  }

  /**
   * Finds all stones associated with a specific user ID.
   * @param userId The ID of the user.
   * @returns A promise resolving to an array of stone entities.
   */
  async findByUserId(userId: string): Promise<StoneEntity[]> {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    return snapshot.docs.map((doc) => this.mapDoc(doc));
  }

  /**
   * Finds all stones associated with a specific game ID.
   * Optionally filters by user ID.
   * @param gameId The ID of the game.
   * @param userId The ID of the user (optional).
   * @returns A promise resolving to an array of stone entities.
   */
  async findByGameId(gameId: string, userId?: string): Promise<StoneEntity[]> {
    let query = this.collection.where('gameId', '==', gameId);
    if (userId) {
      query = query.where('userId', '==', userId);
    }
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => this.mapDoc(doc));
  }

  /**
   * Deletes all stones associated with a specific game ID.
   * @param gameId The ID of the game.
   * @returns A promise that resolves when all stones are deleted.
   */
  async deleteByGameId(gameId: string): Promise<void> {
    const snapshot = await this.collection.where('gameId', '==', gameId).get();
    const batch = this.firebase.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
