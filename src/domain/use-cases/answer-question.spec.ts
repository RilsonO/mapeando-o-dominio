import { TrackProductUseCase } from '@/domain/use-cases/track-product';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { InventoryMovementRepository } from '@/domain/repositories/inventory-movement-repository';
import { Product } from '@/domain/entities/product';
import { InventoryMovement } from '@/domain/entities/inventory-movement';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

const fakeProductsRepository: ProductsRepository = {
  create: async (product: Product) => {
    return;
  },
  findById: async (id: UniqueEntityID) => {
    return null;
  },
  find: async (criteria: Partial<Product>) => {
    return Product.create(
      {
        name: 'Produto Teste',
        size: 'M',
        color: 'Azul',
        quantity: 100,
        minimumQuantity: 10,
        createdAt: new Date(),
      },
      new UniqueEntityID('1')
    );
  },
};

const fakeInventoryMovementRepository: InventoryMovementRepository = {
  findByProductId: async (productId: UniqueEntityID) => {
    return [
      InventoryMovement.create(
        {
          productId: new UniqueEntityID('1'),
          type: 'inbound',
          quantity: 10,
          createdAt: new Date(),
        },
        new UniqueEntityID('1')
      ),
      InventoryMovement.create(
        {
          productId: new UniqueEntityID('1'),
          type: 'outbound',
          quantity: 5,
          createdAt: new Date(),
        },
        new UniqueEntityID('2')
      ),
    ];
  },
};

test('track a product', async () => {
  const trackProductUseCase = new TrackProductUseCase(
    fakeProductsRepository,
    fakeInventoryMovementRepository
  );

  const response = await trackProductUseCase.execute({
    id: new UniqueEntityID('1'),
  });

  expect(response.product.name).toEqual('Produto Teste');
  expect(response.inventoryMovements).toHaveLength(2);
  expect(response.inventoryMovements[0].type).toEqual('inbound');
  expect(response.inventoryMovements[1].type).toEqual('outbound');
});
