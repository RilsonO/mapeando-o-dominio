import { CreateProductUseCase } from '@/domain/use-cases/create-product';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { Product } from '@/domain/entities/product';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

const fakeProductsRepository: ProductsRepository = {
  create: async (product: Product) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return null;
  },
  find: async (criteria: Partial<Product>) => {
    return null;
  },
};

test('create a product', async () => {
  const createProductUseCase = new CreateProductUseCase(fakeProductsRepository);

  const response = await createProductUseCase.execute({
    name: 'Produto Novo',
    size: 'G',
    color: 'Vermelho',
    quantity: 50,
    minimumQuantity: 5,
  });

  expect(response.product.name).toEqual('Produto Novo');
  expect(response.product.size).toEqual('G');
  expect(response.product.color).toEqual('Vermelho');
  expect(response.product.quantity).toEqual(50);
  expect(response.product.minimumQuantity).toEqual(5);
});
