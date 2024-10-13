import {
  ISetMinimumStockUseCase,
  SetMinimumStockRequest,
  SetMinimumStockResponse,
} from '@/domain/interfaces/i-set-minimum-stock';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { AlertsRepository } from '@/domain/repositories/alerts-repository';
import { Alert } from '@/domain/entities/alert';

class SetMinimumStockUseCase implements ISetMinimumStockUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private alertsRepository: AlertsRepository
  ) {}

  async execute(
    request: SetMinimumStockRequest
  ): Promise<SetMinimumStockResponse> {
    const product = await this.productsRepository.findById(request.productId);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    product.update({
      name: product.name,
      size: product.size,
      color: product.color,
      quantity: product.quantity,
      minimumQuantity: request.minimumQuantity,
    });

    await this.productsRepository.create(product);

    let alert: Alert | undefined;
    if (product.quantity < request.minimumQuantity) {
      alert = Alert.create({
        productId: product.id,
        type: 'low-stock',
        method: 'system',
        createdAt: new Date(),
      });

      await this.alertsRepository.create(alert);
    }

    return {
      product,
      alert,
    };
  }
}

export { SetMinimumStockUseCase };
