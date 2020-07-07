import { Aggregate } from "../../common/domain/aggregate";
import { ProductAvailabilityChanged } from "./events/store_product.events";

export class StoreProduct extends Aggregate {
  store_id: string;
  product_size_id: string;
  price: number;
  quantity: number;

  constructor(readonly id: string) {
    super(id);
  }

  changeAvailability(
    store_id: string,
    product_size_id: string,
    price: number,
    quantity: number
  ) {
    this.apply(
      new ProductAvailabilityChanged(store_id, product_size_id, price, quantity)
    );
  }

  onProductAvailabilityChanged(event: ProductAvailabilityChanged) {
    this.store_id = event.store_id;
    this.product_size_id = event.product_size_id;
    this.price = event.price;
    this.quantity = event.quantity;
  }
}
