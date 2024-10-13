import { ManagePurchaseOrdersUseCase } from '@/domain/use-cases/manage-purchase-orders';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { PurchaseOrdersRepository } from '@/domain/repositories/purchase-orders-repository';
import { Product } from '@/domain/entities/product';
import { PurchaseOrder } from '@/domain/entities/purchase-order';
import { Supplier } from '@/domain/entities/supplier';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { SuppliersRepository } from '../repositories/suppliers-repository';

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
    return [];
  },
};

const fakePurchaseOrdersRepository: PurchaseOrdersRepository = {
  create: async (purchaseOrder: PurchaseOrder) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return null;
  },
  findByProductId: async (productId: UniqueEntityID) => {
    return [];
  },
  updateStatus: async (
    id: UniqueEntityID,
    status: 'pending' | 'in-transit' | 'out-for-delivery' | 'delivered'
  ) => {
    return;
  },
};

const fakeSuppliersRepository: SuppliersRepository = {
  findByProductId: async (productId: UniqueEntityID) => {
    return Supplier.create(
      {
        name: 'Fornecedor Teste',
        phone: '123456789',
        deliveryTimes: '7 dias',
        createdAt: new Date(),
      },
      new UniqueEntityID('1')
    );
  },
};

test('manage purchase orders', async () => {
  const managePurchaseOrdersUseCase = new ManagePurchaseOrdersUseCase(
    fakeProductsRepository,
    fakePurchaseOrdersRepository,
    fakeSuppliersRepository
  );

  const response = await managePurchaseOrdersUseCase.execute({
    productId: new UniqueEntityID('1'),
    quantity: 10,
  });

  expect(response.purchaseOrder).toBeDefined();
  expect(response.purchaseOrder.status).toEqual('pending');
  expect(response.purchaseOrder.quantity).toEqual(10);
});
