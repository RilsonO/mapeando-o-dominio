import { Product } from '@/domain/entities/product';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { InventoryMovementRepository } from '@/domain/repositories/inventory-movement-repository';
import {
  ITrackProductUseCase,
  TrackProductRequest,
  TrackProductResponse,
} from '@/domain/interfaces/i-track-product';
import { InventoryMovement } from '../entities/inventory-movement';

class TrackProductUseCase implements ITrackProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private inventoryMovementRepository: InventoryMovementRepository
  ) {}

  async execute(request: TrackProductRequest): Promise<TrackProductResponse> {
    const product = await this.productsRepository.find(request);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const inventoryMovements =
      await this.inventoryMovementRepository.findByProductId(product.id);

    return {
      product,
      inventoryMovements: inventoryMovements ?? ([] as InventoryMovement[]),
    };
  }
}

export { TrackProductUseCase };
