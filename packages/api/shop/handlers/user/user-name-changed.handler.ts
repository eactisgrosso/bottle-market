import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserNameChangedEvent } from "../../events/user/user-name-changed";

@EventsHandler(UserNameChangedEvent)
export class UserNameChangedEventHandler
  implements IEventHandler<UserNameChangedEvent> {
  handle(event: UserNameChangedEvent) {}
}
