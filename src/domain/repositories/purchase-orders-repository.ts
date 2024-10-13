import { PurchaseOrder } from '@/domain/entities/purchase-order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface PurchaseOrdersRepository {
  create(purchaseOrder: PurchaseOrder): Promise<void>;
  findById(id: UniqueEntityID): Promise<PurchaseOrder | null>;
  findByProductId(productId: UniqueEntityID): Promise<PurchaseOrder[]>;
  updateStatus(
    id: UniqueEntityID,
    status: 'pending' | 'in-transit' | 'out-for-delivery' | 'delivered'
  ): Promise<void>;
}
