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
}
