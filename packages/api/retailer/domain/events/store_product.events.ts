import { Event } from '../../../common/domain/event';

export class ProductAvailabilityChanged extends Event {
  constructor(
    public readonly store_id: string,
    public readonly product_size_id: string,
    public readonly quantity: number,
    public readonly price: number
  ) {
    super();
  }
}

export const StoreProductEvents = {
  ProductAvailabilityChanged,
};
