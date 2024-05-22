import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import { Sequelize } from "sequelize-typescript";

describe("Test list product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });

    const product1 = ProductFactory.create("a",
    "Produto1", 10 );

    const product2 = ProductFactory.create("b",
    "Produto2", 20 );

    describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);


        productRepository.create(product1 as Product);
        productRepository.create(product2 as Product);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
    });

});
