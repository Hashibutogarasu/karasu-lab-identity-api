import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class GameModel {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  imageKey?: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class StoneModel {
  @Field(() => ID)
  id: string;

  @Field()
  gameId: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field(() => Int)
  amount: number;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  imageKey?: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class StoneLogModel {
  @Field(() => ID)
  id: string;

  @Field()
  stoneId: string;

  @Field()
  userId: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int, { nullable: true })
  previousAmount?: number;

  @Field(() => Int, { nullable: true })
  nextAmount?: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
