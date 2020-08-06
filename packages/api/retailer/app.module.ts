import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from '@nestjsplus/knex';

import { IAppModule } from '../app';
import { AuthzModule } from '../common/auth/authz.module';
import { UserModule } from '../common/services/user/user.module';

import { LocationModule } from './services/location/location.module';
import { StoreModule } from './services/store/store.module';
import { StoreProductModule } from './services/store_product/store_product.module';
import { DeliveryModule } from './services/delivery_area/delivery_area.module';
import { ParameterStore } from '../common/config/parameterStore';

@Module({
  imports: [
    AuthzModule,
    UserModule,
    LocationModule,
    StoreModule,
    StoreProductModule,
    DeliveryModule,
    ConfigModule.forRoot({
      load: [async () => (await ParameterStore.getInstance()).authConfig],
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      path: '/retailer/graphql',
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ request, req }) => ({ req: request ?? req }),
    }),
    KnexModule.registerAsync({
      useFactory: async () => (await ParameterStore.getInstance()).dbConfig,
    }),
  ],
})
export class AppModule implements IAppModule {}
