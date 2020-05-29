import { Aggregate } from "../../common/domain/aggregate";
import { OrderAdded } from "./events/order.events";

export class Order extends Aggregate {
  constructor(readonly id: string) {
    super(id);
  }

  add(orderInput: string) {
    // logic
    this.apply(new OrderAdded(this.id, orderInput));
  }
}
