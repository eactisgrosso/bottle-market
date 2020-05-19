import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserSignedUp, UserNameChanged } from "../domain/events/user.events";
import "../../common/helpers/date.extensions";

@Injectable()
@EventsHandler(UserSignedUp)
export class UserCreatedEventHandler
  implements IEventHandler<UserSignedUp>, IEventHandler<UserNameChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserSignedUp) {
    const exists = await this.knex("marketplace_user")
      .whereNull("authSub")
      .andWhere("email", event.email)
      .first();

    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    if (exists) {
      await this.knex("marketplace_user").where({ email: event.email }).update({
        aggregateId: aggregateId,
        authSub: event.sub,
        firstname: event.firstname,
        lastname: event.lastname,
        last_login: new Date().toMySQLString(),
      });

      return;
    }

    await this.knex("marketplace_user").insert({
      aggregateId: aggregateId,
      authSub: event.sub,
      email: event.email,
      firstname: event.firstname,
      lastname: event.lastname,
      last_login: new Date().toMySQLString(),
      date_added: new Date().toMySQLString(),
      date_last_modified: new Date().toMySQLString(),
    });
  }
}

@Injectable()
@EventsHandler(UserNameChanged)
export class UserNameChangedEventHandler
  implements IEventHandler<UserNameChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserNameChanged) {
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);

    await this.knex("marketplace_user")
      .where("aggregateId", aggregateId)
      .update({
        firstname: event.firstname,
        lastname: event.lastname,
        date_last_modified: new Date().toMySQLString(),
      });
  }
}

export const EventHandlers = [
  UserCreatedEventHandler,
  UserNameChangedEventHandler,
];
