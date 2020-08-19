import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType({ description: 'New delivery data' })
export class AddDeliveryAreaInput implements Partial<DeliveryAreaDTO> {
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
  monday_hours_from?: number;

  @Field({ nullable: true })
  monday_hours_to?: number;

  @Field()
  tuesday: boolean;

  @Field({ nullable: true })
  tuesday_hours_from?: number;

  @Field({ nullable: true })
  tuesday_hours_to?: number;

  @Field()
  wednesday: boolean;

  @Field({ nullable: true })
  wednesday_hours_from?: number;

  @Field({ nullable: true })
  wednesday_hours_to?: number;

  @Field()
  thursday: boolean;

  @Field({ nullable: true })
  thursday_hours_from?: number;

  @Field({ nullable: true })
  thursday_hours_to?: number;

  @Field()
  friday: boolean;

  @Field({ nullable: true })
  friday_hours_from?: number;

  @Field({ nullable: true })
  friday_hours_to?: number;

  @Field()
  saturday: boolean;

  @Field({ nullable: true })
  saturday_hours_from?: number;

  @Field({ nullable: true })
  saturday_hours_to?: number;

  @Field()
  sunday: boolean;

  @Field({ nullable: true })
  sunday_hours_from?: number;

  @Field({ nullable: true })
  sunday_hours_to?: number;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  creation_date: Date;
}

@InputType({ description: ' Change delivery data' })
export class ChangeDeliveryAreaInput implements Partial<DeliveryAreaDTO> {
  @Field()
  id: string;

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
  monday_hours_from?: number;

  @Field({ nullable: true })
  monday_hours_to?: number;

  @Field()
  tuesday: boolean;

  @Field({ nullable: true })
  tuesday_hours_from?: number;

  @Field({ nullable: true })
  tuesday_hours_to?: number;

  @Field()
  wednesday: boolean;

  @Field({ nullable: true })
  wednesday_hours_from?: number;

  @Field({ nullable: true })
  wednesday_hours_to?: number;

  @Field()
  thursday: boolean;

  @Field({ nullable: true })
  thursday_hours_from?: number;

  @Field({ nullable: true })
  thursday_hours_to?: number;

  @Field()
  friday: boolean;

  @Field({ nullable: true })
  friday_hours_from?: number;

  @Field({ nullable: true })
  friday_hours_to?: number;

  @Field()
  saturday: boolean;

  @Field({ nullable: true })
  saturday_hours_from?: number;

  @Field({ nullable: true })
  saturday_hours_to?: number;

  @Field()
  sunday: boolean;

  @Field({ nullable: true })
  sunday_hours_from?: number;

  @Field({ nullable: true })
  sunday_hours_to?: number;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  creation_date: Date;
}

@ObjectType()
export class DeliveryAreaDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  store_id: string;

  @Field()
  store: string;

  @Field()
  address: string;

  @Field()
  radius: Number;

  @Field()
  monday: boolean;

  @Field({ nullable: true })
  monday_hours_from?: number;

  @Field({ nullable: true })
  monday_hours_to?: number;

  @Field()
  tuesday: boolean;

  @Field({ nullable: true })
  tuesday_hours_from?: number;

  @Field({ nullable: true })
  tuesday_hours_to?: number;

  @Field()
  wednesday: boolean;

  @Field({ nullable: true })
  wednesday_hours_from?: number;

  @Field({ nullable: true })
  wednesday_hours_to?: number;

  @Field()
  thursday: boolean;

  @Field({ nullable: true })
  thursday_hours_from?: number;

  @Field({ nullable: true })
  thursday_hours_to?: number;

  @Field()
  friday: boolean;

  @Field({ nullable: true })
  friday_hours_from?: number;

  @Field({ nullable: true })
  friday_hours_to?: number;

  @Field()
  saturday: boolean;

  @Field({ nullable: true })
  saturday_hours_from?: number;

  @Field({ nullable: true })
  saturday_hours_to?: number;

  @Field()
  sunday: boolean;

  @Field({ nullable: true })
  sunday_hours_from?: number;

  @Field({ nullable: true })
  sunday_hours_to?: number;
}

@ObjectType()
export class DeliveryAreaDeleteDTO {
  @Field()
  id: string;

  @Field()
  store_id: string;
}
