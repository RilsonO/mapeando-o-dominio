import { ViewSalesAndStockHistoryUseCase } from '@/domain/use-cases/view-sales-and-stock-history';
import { SalesRepository } from '@/domain/repositories/sales-repository';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { InventoryMovementRepository } from '@/domain/repositories/inventory-movement-repository';
import { Product } from '@/domain/entities/product';
import { Sale } from '@/domain/entities/sale';
import { InventoryMovement } from '@/domain/entities/inventory-movement';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

const fakeSalesRepository: SalesRepository = {
  create: async (sale: Sale) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return null;
  },
  findByDateRange: async (startDate: Date, endDate: Date) => {
    return [
      Sale.create({
        productId: new UniqueEntityID('1'),
        quantity: 10,
        profit: 100,
        saleDate: new Date(),
        createdAt: new Date(),
      }),
      Sale.create({
        productId: new UniqueEntityID('2'),
        quantity: 5,
        profit: 50,
        saleDate: new Date(),
        createdAt: new Date(),
      }),
    ];
  },
};

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
  findAll: async () => {
    return [
      Product.create(
        {
          name: 'Produto 1',
          size: 'M',
          color: 'Azul',
          quantity: 100,
          minimumQuantity: 10,
          createdAt: new Date(),
        },
        new UniqueEntityID('1')
      ),
      Product.create(
        {
          name: 'Produto 2',
          size: 'G',
          color: 'Vermelho',
          quantity: 50,
          minimumQuantity: 5,
          createdAt: new Date(),
        },
        new UniqueEntityID('2')
      ),
    ];
  },
};

const fakeInventoryMovementRepository: InventoryMovementRepository = {
  findByProductId: async (productId: UniqueEntityID) => {
    return [];
  },
  findByDateRange: async (startDate: Date, endDate: Date) => {
    return [
      InventoryMovement.create(
        {
          productId: new UniqueEntityID('1'),
          type: 'inbound',
          quantity: 20,
          createdAt: new Date(),
        },
        new UniqueEntityID('1')
      ),
      InventoryMovement.create(
        {
          productId: new UniqueEntityID('2'),
          type: 'outbound',
          quantity: 10,
          createdAt: new Date(),
        },
        new UniqueEntityID('2')
      ),
    ];
  },
};

test('view sales and stock history', async () => {
  const viewSalesAndStockHistoryUseCase = new ViewSalesAndStockHistoryUseCase(
    fakeSalesRepository,
    fakeProductsRepository,
    fakeInventoryMovementRepository
  );

  const response = await viewSalesAndStockHistoryUseCase.execute({
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
  });

  expect(response.salesData).toHaveLength(2);
  expect(response.salesData[0].productName).toEqual('Produto 1');
  expect(response.salesData[0].quantitySold).toEqual(10);
  expect(response.salesData[0].totalProfit).toEqual(100);
  expect(response.mostSoldProducts).toHaveLength(2);
  expect(response.stockTrends).toHaveLength(2);
});
