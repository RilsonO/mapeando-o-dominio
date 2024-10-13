import {
  IReceiveLowStockAlertsUseCase,
  ReceiveLowStockAlertsRequest,
  ReceiveLowStockAlertsResponse,
} from '@/domain/interfaces/i-receive-low-stock-alerts';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { AlertsRepository } from '@/domain/repositories/alerts-repository';
import { Alert } from '@/domain/entities/alert';

class ReceiveLowStockAlertsUseCase implements IReceiveLowStockAlertsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private alertsRepository: AlertsRepository
  ) {}

  async execute(
    request: ReceiveLowStockAlertsRequest
  ): Promise<ReceiveLowStockAlertsResponse> {
    const product = await this.productsRepository.findById(request.productId);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    if (product.quantity >= product.minimumQuantity) {
      return { alerts: [] };
    }

    const alert = Alert.create({
      productId: product.id,
      type: 'low-stock',
      method: 'system', // ou 'e-mail', dependendo da configuração
      createdAt: new Date(),
    });

    await this.alertsRepository.create(alert);

    return {
      alerts: [alert],
    };
  }
}

export { ReceiveLowStockAlertsUseCase };
