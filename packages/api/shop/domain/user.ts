import { Aggregate } from "../../common/domain/aggregate";
import { UserSignedUp, UserNameChanged } from "./events/user.events";

export class User extends Aggregate {
  sub: string;
  email: string;
  firstname: string;
  lastname: string;
  constructor(readonly id: string) {
    super(id);
  }

  signUp(sub: string, email: string, firstname: string, lastname: string) {
    this.apply(new UserSignedUp(sub, email, firstname, lastname));
  }

  onUserSignedUp(event: UserSignedUp) {
    this.sub = event.sub;
    this.email = event.email;
    this.firstname = event.firstname;
    this.lastname = event.lastname;
  }

  changeName(name: string) {
    const names = name.split(" ");
    const firstname = names[0];
    const lastname = names.slice(1).join(" ");

    this.apply(new UserNameChanged(firstname, lastname));
  }

  onUserNameChanged(event: UserNameChanged) {
    this.firstname = event.firstname;
    this.lastname = event.lastname;
  }
}
