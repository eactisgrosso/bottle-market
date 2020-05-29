import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class DeliveryAreaDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  store: string;

  @Field()
  address: string;

  @Field()
  radius: Number;

  @Field()
  monday: boolean;

  @Field({ nullable: true })
  monday_hours_from?: string;

  @Field({ nullable: true })
  monday_hours_to?: string;

  @Field()
  tuesday: boolean;

  @Field({ nullable: true })
  tuesday_hours_from?: string;

  @Field({ nullable: true })
  tuesday_hours_to?: string;

  @Field()
  wednesday: boolean;

  @Field({ nullable: true })
  wednesday_hours_from?: string;

  @Field({ nullable: true })
  wednesday_hours_to?: string;

  @Field()
  thursday: boolean;

  @Field({ nullable: true })
  thursday_hours_from?: string;

  @Field({ nullable: true })
  thursday_hours_to?: string;

  @Field()
  friday: boolean;

  @Field({ nullable: true })
  friday_hours_from?: string;

  @Field({ nullable: true })
  friday_hours_to?: string;

  @Field()
  saturday: boolean;

  @Field({ nullable: true })
  saturday_hours_from?: string;

  @Field({ nullable: true })
  saturday_hours_to?: string;

  @Field()
  sunday: boolean;

  @Field({ nullable: true })
  sunday_hours_from?: string;

  @Field({ nullable: true })
  sunday_hours_to?: string;
}
