import { Product } from '@/domain/entities/product';
import { InventoryMovement } from '@/domain/entities/inventory-movement';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface TrackProductRequest {
  id?: UniqueEntityID;
  name?: string;
  size?: string;
  color?: string;
  quantity?: number;
  minimumQuantity?: number;
}

interface TrackProductResponse {
  product: Product;
  inventoryMovements: InventoryMovement[];
}

interface ITrackProductUseCase {
  execute(request: TrackProductRequest): Promise<TrackProductResponse>;
}

export { ITrackProductUseCase, TrackProductRequest, TrackProductResponse };
