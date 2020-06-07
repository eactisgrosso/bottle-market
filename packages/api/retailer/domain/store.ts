import { Aggregate } from "../../common/domain/aggregate";
import {
  StoreOpened,
  ProductAdded,
  ProductIncremented,
  ProductDecremented,
  StoreClosed,
} from "./events/store.events";

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
  products: Map<string, ProductInfo>;

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
        "AR",
        "Argentina",
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
    this.products = new Map<string, ProductInfo>();
  }

  addProduct(product_size_id: string, price: number) {
    this.apply(new ProductAdded(product_size_id, price));
  }

  onProductAdded(event: ProductAdded) {
    this.products.set(
      event.product_size_id,
      new ProductInfo(event.product_size_id, event.price)
    );
  }

  incrementProduct(product_size_id: string) {
    const productInfo = this.products.get(product_size_id);
    if (!productInfo) throw Error(`Product not found: ${product_size_id}`);

    this.apply(
      new ProductIncremented(product_size_id, productInfo.quantity + 1)
    );
  }

  onProductIncremented(event: ProductIncremented) {
    const productInfo = this.products.get(event.product_size_id);
    if (productInfo) productInfo.quantity++;
    else throw Error(`Product not found: ${event.product_size_id}`);
  }

  decrementProduct(product_size_id: string) {
    const productInfo = this.products.get(product_size_id);
    if (!productInfo) throw Error(`Product not found: ${product_size_id}`);
    if (productInfo.quantity == 0) return;

    this.apply(
      new ProductDecremented(product_size_id, productInfo.quantity - 1)
    );
  }

  onProductDecremented(event: ProductDecremented) {
    const productInfo = this.products.get(event.product_size_id);
    if (productInfo) {
      productInfo.quantity--;
      if (productInfo.quantity == 0)
        this.products.delete(event.product_size_id);
    } else throw Error(`Product not found: ${event.product_size_id}`);
  }

  close() {
    this.apply(new StoreClosed());
  }

  onStoreClosed(event: StoreClosed) {
    //TODO: decide what to do with a closed store
  }
}

class ProductInfo {
  constructor(id: string, price: number) {
    this.id = id;
    this.price = price;
    this.quantity = 1;
  }
  id: string;
  quantity: number;
  price: number;
}
