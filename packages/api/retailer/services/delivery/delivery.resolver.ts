import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import { DeliveryAreaRepository } from "../../domain/repositories/delivery_area.repository";
import DeliveryAreaDTO from "../delivery/delivery.type";
import AddDeliveryAreaInput from "../delivery/delivery.input_type";
import DeliveryAreaDeleteDTO from "./delivery.delete_type";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class DeliveryResolver {
  constructor(
    private repository: DeliveryAreaRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [DeliveryAreaDTO])
  async deliveryAreas(@User() user: any): Promise<DeliveryAreaDTO[]> {
    const dbAreas = await this.knex("delivery_area_view")
      .select("*")
      .where("user_id", user.id);

    return dbAreas;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [DeliveryAreaDTO])
  async deliveryAreasByStore(
    @User() user: any,
    @Args("store_id") store_id: string
  ): Promise<DeliveryAreaDTO[]> {
    const dbAreas = await this.knex("delivery_area_view")
      .select("*")
      .where("user_id", user.id)
      .andWhere("store_id", store_id);

    return dbAreas;
  }

  @Mutation(() => DeliveryAreaDTO, { description: "Create Delivery Area" })
  async createDeliveryArea(
    @Args("deliveryAreaInput") deliveryAreaInput: AddDeliveryAreaInput
  ): Promise<DeliveryAreaDTO> {
    const id = uuidv4();
    const delivery_area = await this.repository.load(id);

    delivery_area.setup(
      deliveryAreaInput.name,
      deliveryAreaInput.store_id,
      deliveryAreaInput.store,
      deliveryAreaInput.address,
      deliveryAreaInput.lat,
      deliveryAreaInput.lng,
      deliveryAreaInput.radius,
      deliveryAreaInput.monday,
      deliveryAreaInput.tuesday,
      deliveryAreaInput.wednesday,
      deliveryAreaInput.thursday,
      deliveryAreaInput.friday,
      deliveryAreaInput.saturday,
      deliveryAreaInput.sunday,
      deliveryAreaInput.monday_hours_from,
      deliveryAreaInput.monday_hours_to,
      deliveryAreaInput.tuesday_hours_from,
      deliveryAreaInput.tuesday_hours_to,
      deliveryAreaInput.wednesday_hours_from,
      deliveryAreaInput.wednesday_hours_to,
      deliveryAreaInput.thursday_hours_from,
      deliveryAreaInput.thursday_hours_to,
      deliveryAreaInput.friday_hours_from,
      deliveryAreaInput.friday_hours_to,
      deliveryAreaInput.saturday_hours_from,
      deliveryAreaInput.saturday_hours_to,
      deliveryAreaInput.sunday_hours_from,
      deliveryAreaInput.sunday_hours_to
    );

    delivery_area.commit();

    let dto = new DeliveryAreaDTO();
    Object.keys(delivery_area).forEach(
      (key) => ((dto as DeliveryAreaDTO)[key] = delivery_area[key])
    );

    return dto;
  }

  @Mutation(() => DeliveryAreaDeleteDTO)
  async deleteDeliveryArea(
    @Args("id") id: string
  ): Promise<DeliveryAreaDeleteDTO> {
    const delivery_area = await this.repository.load(id);

    delivery_area.close();
    delivery_area.commit();

    const dto = new DeliveryAreaDeleteDTO();
    dto.id = id;
    dto.store_id = delivery_area.store_id;

    return dto;
  }
}
