import { Aggregate } from '../../common/domain/aggregate';
import { StoreOpened, StoreClosed } from './events/store.events';

export class Store extends Aggregate {
  name: string;
  store_type: string;
  country_id: string;
  country: string;
  state_id: string;
  state: string;
  city_id: string;
  city: string;
  street: string;

  constructor(readonly id: string) {
    super(id);
  }

  open(
    name: string,
    store_type: string,
    state_id: string,
    state: string,
    city_id: string,
    city: string,
    street: string
  ) {
    this.apply(
      new StoreOpened(
        name,
        store_type,
        'AR',
        'Argentina',
        state_id,
        state,
        city_id,
        city,
        street
      )
    );
  }

  onStoreOpened(event: StoreOpened) {
    this.name = event.name;
    this.store_type = event.store_type;
    this.country_id = event.country_id;
    this.country = event.country;
    this.state_id = this.state_id;
    this.state = event.state;
    this.city_id = event.city_id;
    this.city = event.city;
    this.street = event.street;
  }

  close() {
    this.apply(new StoreClosed());
  }

  onStoreClosed(event: StoreClosed) {
    //TODO: decide what to do with a closed store
  }
}
