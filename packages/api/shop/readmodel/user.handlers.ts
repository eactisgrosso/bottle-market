import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserSignedUp, UserNameChanged } from "../domain/events/user.events";
import "../../common/helpers/date.extensions";

@Injectable()
@EventsHandler(UserSignedUp)
export class UserCreatedHandler implements IEventHandler<UserSignedUp> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserSignedUp) {
    const exists = await this.knex("user")
      .whereNull("authSub")
      .andWhere("email", event.email)
      .first();

    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);
    if (exists) {
      await this.knex("user").where({ email: event.email }).update({
        aggregateId: aggregateId,
        authSub: event.sub,
        firstname: event.firstname,
        lastname: event.lastname,
        last_login: new Date().toMySQLString(),
      });

      return;
    }

    await this.knex("user").insert({
      aggregateId: aggregateId,
      authSub: event.sub,
      email: event.email,
      firstname: event.firstname,
      lastname: event.lastname,
      last_login: event.timestamp.toMySQLString(),
      date_added: event.timestamp.toMySQLString(),
      date_last_modified: event.timestamp.toMySQLString(),
    });
  }
}

@Injectable()
@EventsHandler(UserNameChanged)
export class UserNameChangedHandler implements IEventHandler<UserNameChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserNameChanged) {
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", event.aggregateId);

    await this.knex("user").where("aggregateId", aggregateId).update({
      firstname: event.firstname,
      lastname: event.lastname,
      date_last_modified: new Date().toMySQLString(),
    });
  }
}

export const EventHandlers = [UserCreatedHandler, UserNameChangedHandler];
