import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import cuid from 'cuid';
import {
  GameModel,
  StoneModel,
  StoneLogModel,
} from '../models/stonemanage.model.js';
import {
  CreateGameInput,
  UpdateGameInput,
  CreateStoneInput,
  UpdateStoneInput,
  CreateLogInput,
} from '../models/stonemanage.input.js';
import { IFirebaseAdminProvider } from '../../../shared/firebase/firebase-admin.provider.interface.js';
import { GqlUser } from '../../../shared/auth/gql-user.decorator.js';
import {
  RequireOwnership,
  OwnershipGuard,
} from '../../../shared/auth/ownership.guard.js';
import { ErrorCodes } from '../../../shared/errors/error.codes.js';
import type { User, Game, Stone, StoneLog } from '../stonemanage.schema.js';

@Resolver(() => GameModel)
export class GamesResolver {
  constructor(private firebase: IFirebaseAdminProvider) {}

  @Query(() => [GameModel])
  async games(@GqlUser() user: User): Promise<Game[]> {
    const snapshot = await this.firebase.db
      .collection('games')
      .where('userId', '==', user.id)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Game);
  }

  @Query(() => GameModel)
  @UseGuards(OwnershipGuard)
  @RequireOwnership('games')
  async game(@Args('id', { type: () => ID }) id: string): Promise<Game> {
    const doc = await this.firebase.db.collection('games').doc(id).get();
    if (!doc.exists) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    return { id: doc.id, ...doc.data() } as Game;
  }

  @Mutation(() => GameModel)
  async createGame(
    @GqlUser() user: User,
    @Args('input', { type: () => CreateGameInput }) input: CreateGameInput,
  ): Promise<Game> {
    const id = cuid();
    const now = new Date().toISOString();
    const data = { ...input, userId: user.id, createdAt: now, updatedAt: now };
    await this.firebase.db.collection('games').doc(id).set(data);
    return { id, ...data } as Game;
  }

  @Mutation(() => GameModel)
  @UseGuards(OwnershipGuard)
  @RequireOwnership('games')
  async updateGame(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UpdateGameInput }) input: UpdateGameInput,
  ): Promise<Game> {
    const now = new Date().toISOString();
    const data = { ...input, updatedAt: now };
    await this.firebase.db.collection('games').doc(id).update(data);
    const doc = await this.firebase.db.collection('games').doc(id).get();
    return { id: doc.id, ...doc.data() } as Game;
  }

  @Mutation(() => Boolean)
  @UseGuards(OwnershipGuard)
  @RequireOwnership('games')
  async deleteGame(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.firebase.db.collection('games').doc(id).delete();
    return true;
  }
}

@Resolver(() => StoneModel)
export class StonesResolver {
  constructor(private firebase: IFirebaseAdminProvider) {}

  @Query(() => [StoneModel])
  async stones(
    @GqlUser() user: User,
    @Args('gameId', { type: () => ID, nullable: true }) gameId?: string,
  ): Promise<Stone[]> {
    let query = this.firebase.db
      .collection('stones')
      .where('userId', '==', user.id);
    if (gameId) query = query.where('gameId', '==', gameId);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Stone);
  }

  @Mutation(() => StoneModel)
  async createStone(
    @GqlUser() user: User,
    @Args('input', { type: () => CreateStoneInput }) input: CreateStoneInput,
  ): Promise<Stone> {
    const gameDoc = await this.firebase.db
      .collection('games')
      .doc(input.gameId)
      .get();
    if (!gameDoc.exists) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    const gameData = gameDoc.data() as Game;
    if (gameData?.userId !== user.id) throw new ForbiddenException();

    const id = cuid();
    const now = new Date().toISOString();
    const data = { ...input, userId: user.id, createdAt: now, updatedAt: now };
    await this.firebase.db.collection('stones').doc(id).set(data);
    return { id, ...data } as Stone;
  }

  @Mutation(() => StoneModel)
  @UseGuards(OwnershipGuard)
  @RequireOwnership('stones')
  async updateStone(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UpdateStoneInput }) input: UpdateStoneInput,
  ): Promise<Stone> {
    const now = new Date().toISOString();
    const data = { ...input, updatedAt: now };
    await this.firebase.db.collection('stones').doc(id).update(data);
    const doc = await this.firebase.db.collection('stones').doc(id).get();
    return { id: doc.id, ...doc.data() } as Stone;
  }

  @Mutation(() => Boolean)
  @UseGuards(OwnershipGuard)
  @RequireOwnership('stones')
  async deleteStone(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.firebase.db.collection('stones').doc(id).delete();
    return true;
  }
}

@Resolver(() => StoneLogModel)
export class StoneLogsResolver {
  constructor(private firebase: IFirebaseAdminProvider) {}

  @Query(() => [StoneLogModel])
  async stoneLogs(
    @GqlUser() user: User,
    @Args('stoneId', { type: () => ID }) stoneId: string,
  ): Promise<StoneLog[]> {
    const stoneDoc = await this.firebase.db
      .collection('stones')
      .doc(stoneId)
      .get();
    if (!stoneDoc.exists) throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    const stoneData = stoneDoc.data() as Stone;
    if (stoneData?.userId !== user.id) throw new ForbiddenException();

    const snapshot = await this.firebase.db
      .collection('logs')
      .where('stoneId', '==', stoneId)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as StoneLog,
    );
  }

  @Mutation(() => StoneLogModel)
  async createStoneLog(
    @GqlUser() user: User,
    @Args('input', { type: () => CreateLogInput }) input: CreateLogInput,
  ): Promise<StoneLog> {
    const stoneRef = this.firebase.db.collection('stones').doc(input.stoneId);
    const stoneDoc = await stoneRef.get();
    if (!stoneDoc.exists) throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    const stoneData = stoneDoc.data() as Stone;
    if (stoneData.userId !== user.id) throw new ForbiddenException();

    const id = cuid();
    const now = new Date().toISOString();
    const previousAmount = stoneData.amount;
    const nextAmount = previousAmount + input.amount;

    const logData = {
      ...input,
      userId: user.id,
      previousAmount,
      nextAmount,
      createdAt: now,
      updatedAt: now,
    };

    await this.firebase.db.runTransaction(async (transaction) => {
      transaction.set(this.firebase.db.collection('logs').doc(id), logData);
      transaction.update(stoneRef, { amount: nextAmount, updatedAt: now });
      await Promise.resolve();
    });

    return { id, ...logData } as StoneLog;
  }
}
