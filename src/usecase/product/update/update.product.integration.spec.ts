import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
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

        const product = new Product("123", "Produto1",10);

    const input = {
    id: "123",
    name: "Product1111",
    price: 20,
    };

    describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        productRepository.create(product);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
    });
});
