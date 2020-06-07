import { Event } from "../../../common/domain/event";

export class StoreOpened extends Event {
  constructor(
    public readonly name: string,
    public readonly store_type: string,
    public readonly country_id: string,
    public readonly country: string,
    public readonly state_id: string,
    public readonly state: string,
    public readonly city_id: string,
    public readonly city: string,
    public readonly street: string
  ) {
    super();
  }
}

export class ProductAdded extends Event {
  constructor(
    public readonly product_size_id: string,
    public readonly price: number
  ) {
    super();
  }
}

export class ProductIncremented extends Event {
  constructor(
    public readonly product_size_id: string,
    public readonly quantity: number
  ) {
    super();
  }
}

export class ProductDecremented extends Event {
  constructor(
    public readonly product_size_id: string,
    public readonly quantity: number
  ) {
    super();
  }
}

export class StoreClosed extends Event {
  constructor() {
    super();
  }
}

export const StoreEvents = {
  StoreOpened,
  ProductAdded,
  ProductIncremented,
  ProductDecremented,
  StoreClosed,
};
