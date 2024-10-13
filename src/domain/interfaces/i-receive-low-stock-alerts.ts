import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Alert } from '../entities/alert';

export interface ReceiveLowStockAlertsRequest {
  productId: UniqueEntityID;
}

export interface ReceiveLowStockAlertsResponse {
  alerts: Alert[];
}

export interface IReceiveLowStockAlertsUseCase {
  execute(
    request: ReceiveLowStockAlertsRequest
  ): Promise<ReceiveLowStockAlertsResponse>;
}
