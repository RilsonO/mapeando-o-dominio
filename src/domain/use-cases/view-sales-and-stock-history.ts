import {
  IViewSalesAndStockHistoryUseCase,
  ViewSalesAndStockHistoryRequest,
  ViewSalesAndStockHistoryResponse,
  ProductSalesData,
} from '@/domain/interfaces/i-view-sales-and-stock-history';
import { SalesRepository } from '@/domain/repositories/sales-repository';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { InventoryMovementRepository } from '@/domain/repositories/inventory-movement-repository';
import { Product } from '../entities/product';

class ViewSalesAndStockHistoryUseCase
  implements IViewSalesAndStockHistoryUseCase
{
  constructor(
    private salesRepository: SalesRepository,
    private productsRepository: ProductsRepository,
    private inventoryMovementRepository: InventoryMovementRepository
  ) {}

  async execute(
    request: ViewSalesAndStockHistoryRequest
  ): Promise<ViewSalesAndStockHistoryResponse> {
    const sales = await this.salesRepository.findByDateRange(
      request.startDate,
      request.endDate
    );
    const products = await this.productsRepository.findAll();
    const inventoryMovements =
      await this.inventoryMovementRepository.findByDateRange(
        request.startDate,
        request.endDate
      );

    const salesData: ProductSalesData[] = products.map((product: Product) => {
      const productSales = sales.filter((sale) =>
        sale.productId.equals(product.id)
      );
      const quantitySold = productSales.reduce(
        (sum, sale) => sum + sale.quantity,
        0
      );
      const totalProfit = productSales.reduce(
        (sum, sale) => sum + sale.profit,
        0
      );

      return {
        productId: product.id,
        productName: product.name,
        quantitySold,
        totalProfit,
      };
    });

    const mostSoldProducts = [...salesData]
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 5);

    return {
      salesData,
      mostSoldProducts,
      stockTrends: inventoryMovements,
    };
  }
}

export { ViewSalesAndStockHistoryUseCase };
