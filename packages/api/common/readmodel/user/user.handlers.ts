import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserSignedUp, UserNameChanged } from "../../domain/user/user.events";

@Injectable()
@EventsHandler(UserSignedUp)
export class UserCreatedHandler implements IEventHandler<UserSignedUp> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserSignedUp) {
    const exists = await this.knex("user")
      .whereNull("authSub")
      .andWhere("email", event.email)
      .first();

    if (exists) {
      await this.knex("user").where({ email: event.email }).update({
        id: event.aggregateId,
        authSub: event.sub,
        firstname: event.firstname,
        lastname: event.lastname,
        last_login: event.timestamp,
      });

      return;
    }

    await this.knex("user").insert({
      id: event.aggregateId,
      authSub: event.sub,
      email: event.email,
      firstname: event.firstname,
      lastname: event.lastname,
      last_login: event.timestamp,
      date_added: event.timestamp,
      date_last_modified: event.timestamp,
    });
  }
}

@Injectable()
@EventsHandler(UserNameChanged)
export class UserNameChangedHandler implements IEventHandler<UserNameChanged> {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  async handle(event: UserNameChanged) {
    await this.knex("user").where("id", event.aggregateId).update({
      firstname: event.firstname,
      lastname: event.lastname,
      date_last_modified: new Date(),
    });
  }
}

export const EventHandlers = [UserCreatedHandler, UserNameChangedHandler];
