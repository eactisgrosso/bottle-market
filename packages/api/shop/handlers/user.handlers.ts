import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent, UserNameChangedEvent } from "../events/user.events";
import "../../common/helpers/date.extensions";

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserCreatedEvent) {
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
@EventsHandler(UserNameChangedEvent)
export class UserNameChangedEventHandler
  implements IEventHandler<UserNameChangedEvent> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserNameChangedEvent) {
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    const names = event.name.split(" ");

    await this.knex("marketplace_user")
      .where("aggregateId", aggregateId)
      .update({
        firstname: names[0],
        lastname: names.slice(1).join(" "),
        date_last_modified: new Date().toMySQLString(),
      });
  }
}

export const EventHandlers = [
  UserCreatedEventHandler,
  UserNameChangedEventHandler,
];
