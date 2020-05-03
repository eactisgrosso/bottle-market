import { Event } from "../../../common/event";

export class UserNameChangedEvent extends Event {
  constructor(public readonly name: string) {
    super();
  }
}
