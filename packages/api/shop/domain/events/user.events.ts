import { Event } from "../../../common/domain/event";
import { User } from "../user";

export class UserSignedUp extends Event {
  constructor(
    public readonly sub: string,
    public readonly email: string,
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    super();
  }
}

export class UserNameChanged extends Event {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    super();
  }
}

export const UserEvents = {
  UserSignedUp,
  UserNameChanged,
};
