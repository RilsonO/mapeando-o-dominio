import {
  IManagePurchaseOrdersUseCase,
  ManagePurchaseOrdersRequest,
  ManagePurchaseOrdersResponse,
} from '@/domain/interfaces/i-manage-purchase-orders';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { PurchaseOrdersRepository } from '@/domain/repositories/purchase-orders-repository';
import { SuppliersRepository } from '@/domain/repositories/suppliers-repository';
import { PurchaseOrder } from '@/domain/entities/purchase-order';

class ManagePurchaseOrdersUseCase implements IManagePurchaseOrdersUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private purchaseOrdersRepository: PurchaseOrdersRepository,
    private suppliersRepository: SuppliersRepository
  ) {}

  async execute(
    request: ManagePurchaseOrdersRequest
  ): Promise<ManagePurchaseOrdersResponse> {
    const product = await this.productsRepository.findById(request.productId);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    if (product.quantity >= product.minimumQuantity) {
      throw new Error(
        'Estoque suficiente, não é necessário criar ordem de compra'
      );
    }

    const supplier = await this.suppliersRepository.findByProductId(product.id);

    if (!supplier) {
      throw new Error('Fornecedor não encontrado');
    }

    const purchaseOrder = PurchaseOrder.create({
      productId: product.id,
      quantity: request.quantity,
      status: 'pending',
      orderDate: new Date(),
    });

    await this.purchaseOrdersRepository.create(purchaseOrder);

    return {
      purchaseOrder,
    };
  }
}

export { ManagePurchaseOrdersUseCase };
