import { SetMinimumStockUseCase } from '@/domain/use-cases/set-minimum-stock';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { Product } from '@/domain/entities/product';
import { Alert } from '@/domain/entities/alert';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AlertsRepository } from '@/domain/repositories/alerts-repository';

const fakeProductsRepository: ProductsRepository = {
  create: async (product: Product) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return Product.create(
      {
        name: 'Produto Teste',
        size: 'M',
        color: 'Azul',
        quantity: 5,
        minimumQuantity: 10,
        createdAt: new Date(),
      },
      id
    );
  },
  find: async (criteria: Partial<Product>) => {
    return null;
  },
};

const fakeAlertsRepository: AlertsRepository = {
  create: async (alert: Alert) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return null;
  },
  find: async (criteria: Partial<Alert>) => {
    return null;
  },
};

test('set minimum stock and create alert if stock is low', async () => {
  const setMinimumStockUseCase = new SetMinimumStockUseCase(
    fakeProductsRepository,
    fakeAlertsRepository
  );

  const response = await setMinimumStockUseCase.execute({
    productId: new UniqueEntityID('1'),
    minimumQuantity: 10,
  });

  expect(response.product.minimumQuantity).toEqual(10);
  expect(response.alert).toBeDefined();
  expect(response.alert?.type).toEqual('low-stock');
  expect(response.alert?.method).toEqual('system');
});
