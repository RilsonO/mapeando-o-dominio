import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Product } from '@/domain/entities/product';

export interface ProductsRepository {
  create(product: Product): Promise<void>;
  findById(id: UniqueEntityID): Promise<Product | null>;
  find(criteria: Partial<Product>): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
