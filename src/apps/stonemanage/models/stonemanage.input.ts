import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  imageKey?: string;
}

@InputType()
export class UpdateGameInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  imageKey?: string;
}

@InputType()
export class CreateStoneInput {
  @Field()
  gameId: string;

  @Field()
  name: string;

  @Field(() => Int)
  amount: number;

  @Field({ nullable: true })
  imageKey?: string;
}

@InputType()
export class UpdateStoneInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  imageKey?: string;
}

@InputType()
export class CreateLogInput {
  @Field()
  stoneId: string;

  @Field(() => Int)
  amount: number;
}
