import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import { DeliveryAreaRepository } from "../../domain/repositories/delivery_area.repository";
import DeliveryAreaDTO from "../delivery/delivery.type";
import AddDeliveryAreaInput from "../delivery/delivery.input_type";

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
    @Args("deliveryArea") deliveryArea: AddDeliveryAreaInput
  ): Promise<DeliveryAreaDTO> {
    const id = uuidv4();

    const delivery_area = await this.repository.load(id);

    delivery_area.setup(
      deliveryArea.name,
      deliveryArea.store_id,
      deliveryArea.address,
      deliveryArea.lat,
      deliveryArea.lng,
      deliveryArea.radius,
      deliveryArea.monday,
      deliveryArea.tuesday,
      deliveryArea.wednesday,
      deliveryArea.thursday,
      deliveryArea.friday,
      deliveryArea.saturday,
      deliveryArea.sunday,
      deliveryArea.monday_hours_from,
      deliveryArea.monday_hours_to,
      deliveryArea.tuesday_hours_from,
      deliveryArea.tuesday_hours_to,
      deliveryArea.wednesday_hours_from,
      deliveryArea.wednesday_hours_to,
      deliveryArea.thursday_hours_from,
      deliveryArea.thursday_hours_to,
      deliveryArea.friday_hours_from,
      deliveryArea.friday_hours_to,
      deliveryArea.saturday_hours_from,
      deliveryArea.saturday_hours_to,
      deliveryArea.sunday_hours_from,
      deliveryArea.sunday_hours_to
    );

    delivery_area.commit();

    let dto = new DeliveryAreaDTO();
    Object.keys(deliveryArea).forEach(
      (key) => ((dto as DeliveryAreaDTO)[key] = deliveryArea[key])
    );

    return dto;
  }

  @Mutation(() => String)
  async deleteDeliveryArea(@Args("id") id: string): Promise<string> {
    const delivery = await this.repository.load(id);

    delivery.close();
    delivery.commit();

    return id;
  }
}
