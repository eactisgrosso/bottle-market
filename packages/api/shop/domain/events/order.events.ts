import { Event } from "../../../common/domain/event";

export class OrderAdded extends Event {
  constructor(
    public readonly orderId: string,
    public readonly orderInput: string
  ) {
    super();
  }
}
