import { ReceiveLowStockAlertsUseCase } from '@/domain/use-cases/receive-low-stock-alerts';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { AlertsRepository } from '@/domain/repositories/alerts-repository';
import { Product } from '@/domain/entities/product';
import { Alert } from '@/domain/entities/alert';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

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
  findAll: async () => {
    return [] as Product[];
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

test('receive low stock alerts', async () => {
  const receiveLowStockAlertsUseCase = new ReceiveLowStockAlertsUseCase(
    fakeProductsRepository,
    fakeAlertsRepository
  );

  const response = await receiveLowStockAlertsUseCase.execute({
    productId: new UniqueEntityID('1'),
  });

  expect(response.alerts).toHaveLength(1);
  expect(response.alerts[0].type).toEqual('low-stock');
  expect(response.alerts[0].method).toEqual('system');
});
