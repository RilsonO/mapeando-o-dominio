import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InventoryMovement } from '../entities/inventory-movement';

export interface ViewSalesAndStockHistoryRequest {
  startDate: Date;
  endDate: Date;
}

export interface ProductSalesData {
  productId: UniqueEntityID;
  productName: string;
  quantitySold: number;
  totalProfit: number;
}

export interface ViewSalesAndStockHistoryResponse {
  salesData: ProductSalesData[];
  mostSoldProducts: ProductSalesData[];
  stockTrends: InventoryMovement[];
}

export interface IViewSalesAndStockHistoryUseCase {
  execute(
    request: ViewSalesAndStockHistoryRequest
  ): Promise<ViewSalesAndStockHistoryResponse>;
}
