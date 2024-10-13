import { Supplier } from '@/domain/entities/supplier';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface SuppliersRepository {
  findByProductId(productId: UniqueEntityID): Promise<Supplier | null>;
}
