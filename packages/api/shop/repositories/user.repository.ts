import { Injectable } from "@nestjs/common";
import { EventStore } from "../../common/domain/event.store";
import { User } from "../domain/user";

@Injectable()
export class UserRepository {
  constructor(private eventStore: EventStore) {}

  async load(id: string): Promise<User> {
    return await this.eventStore.context(new User(id));
  }
}
