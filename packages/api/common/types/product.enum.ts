import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
  vino,
  spirits,
  oporto,
  vermouth,
}

registerEnumType(ProductType, {
  name: 'ProductType',
  description: 'The basic product types',
});
