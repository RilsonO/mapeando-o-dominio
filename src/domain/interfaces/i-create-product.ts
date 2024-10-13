import { Product } from '@/domain/entities/product';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface CreateProductRequest {
  name: string;
  size: string;
  color: string;
  quantity: number;
  minimumQuantity: number;
}

export interface CreateProductResponse {
  product: Product;
}

export interface ICreateProductUseCase {
  execute(request: CreateProductRequest): Promise<CreateProductResponse>;
}
