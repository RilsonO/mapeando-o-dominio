import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Product } from '../entities/product';
import { Alert } from '../entities/alert';

export interface SetMinimumStockRequest {
  productId: UniqueEntityID;
  minimumQuantity: number;
}

export interface SetMinimumStockResponse {
  product: Product;
  alert?: Alert;
}

export interface ISetMinimumStockUseCase {
  execute(request: SetMinimumStockRequest): Promise<SetMinimumStockResponse>;
}
