import { Aggregate } from "../../common/domain/aggregate";
import { UserCreatedEvent, UserNameChangedEvent } from "../events/user.events";

export class User extends Aggregate {
  constructor(readonly id: string) {
    super(id);
  }

  create(sub: string, email: string, firstname: string, lastname: string) {
    this.apply(new UserCreatedEvent(sub, email, firstname, lastname));
  }

  changeName(name: string) {
    this.apply(new UserNameChangedEvent(name));
  }
}
