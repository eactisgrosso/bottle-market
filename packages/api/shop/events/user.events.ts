import { Event } from "../../common/domain/event";

export class UserCreatedEvent extends Event {
  constructor(
    public readonly sub: string,
    public readonly email: string,
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    super();
  }
}

export class UserNameChangedEvent extends Event {
  constructor(public readonly name: string) {
    super();
  }
}
