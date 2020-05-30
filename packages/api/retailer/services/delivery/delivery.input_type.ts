import { InputType, Field, ID, Int, Float } from "@nestjs/graphql";
import DeliveryAreaDTO from "./delivery.type";

@InputType({ description: "New delivery data" })
export default class AddDeliveryAreaInput implements Partial<DeliveryAreaDTO> {
  @Field()
  name: string;

  @Field({ nullable: true })
  store!: string;

  @Field()
  store_id: string;

  @Field()
  address: string;

  @Field()
  radius: number;

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

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  creation_date: Date;
}
