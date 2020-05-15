import { Event } from "../../../common/domain/event";

export class OrderAddedEvent extends Event {
  constructor(
    public readonly orderId: string,
    public readonly orderInput: string
  ) {
    super();
  }
}
