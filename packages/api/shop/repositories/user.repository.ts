import { Injectable } from "@nestjs/common";
import { EventStore } from "../../common/event.store";
import { User } from "../domain/user";

@Injectable()
export class UserRepository {
  constructor(private eventStore: EventStore) {}

  async findOneById(id: string): Promise<User> {
    return await this.eventStore.context(new User(id));
  }
}
