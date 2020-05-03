import { Aggregate } from "../../common/aggregate";
import { UserNameChangedEvent } from "../events/user/user-name-changed";

export class User extends Aggregate {
  constructor(readonly id: string) {
    super(id);
  }

  changeName(name: string) {
    // logic
    this.apply(new UserNameChangedEvent(name));
  }
}
