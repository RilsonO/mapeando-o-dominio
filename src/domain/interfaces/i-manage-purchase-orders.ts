import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PurchaseOrder } from '../entities/purchase-order';

export interface ManagePurchaseOrdersRequest {
  productId: UniqueEntityID;
  quantity: number;
}

export interface ManagePurchaseOrdersResponse {
  purchaseOrder: PurchaseOrder;
}

export interface IManagePurchaseOrdersUseCase {
  execute(
    request: ManagePurchaseOrdersRequest
  ): Promise<ManagePurchaseOrdersResponse>;
}
