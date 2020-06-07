import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../retailer/app.module";
import { StoreRepository } from "../retailer/domain/repositories/store.repository";

describe("StoreResolver", () => {
  let retailerApp: INestApplication;
  let storeRepository = {
    ctx: async (object: any) => {
      return object;
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StoreRepository)
      .useValue(storeRepository)
      .compile();

    retailerApp = moduleRef.createNestApplication();
    await retailerApp.init();
  });

  it(`/GET retailer`, () => {
    return request(retailerApp.getHttpServer())
      .get("/retailer/graphql")
      .expect(200)
      .expect({
        data: [],
      });
  });

  afterAll(async () => {
    await retailerApp.close();
  });
});
