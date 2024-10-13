import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InventoryMovement } from '@/domain/entities/inventory-movement';

export interface InventoryMovementRepository {
  findByProductId(productId: UniqueEntityID): Promise<InventoryMovement[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<InventoryMovement[]>;
}
