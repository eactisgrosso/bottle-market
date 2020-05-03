import { registerEnumType } from "@nestjs/graphql";

export enum ProductType {
  WINE = "Vino",
  SPIRITS = "Spirits",
  OPORTO = "Oporto",
  VERMOUTH = "Vermouth",
}

registerEnumType(ProductType, {
  name: "ProductType",
  description: "The basic product types",
});
