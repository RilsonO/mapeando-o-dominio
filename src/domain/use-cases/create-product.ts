import {
  ICreateProductUseCase,
  CreateProductRequest,
  CreateProductResponse,
} from '@/domain/interfaces/i-create-product';
import { ProductsRepository } from '@/domain/repositories/products-repository';
import { Product } from '@/domain/entities/product';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

class CreateProductUseCase implements ICreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const product = Product.create({
      name: request.name,
      size: request.size,
      color: request.color,
      quantity: request.quantity,
      minimumQuantity: request.minimumQuantity,
      createdAt: new Date(),
    });

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}

export { CreateProductUseCase };
