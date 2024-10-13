import { Sale } from '@/domain/entities/sale';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface SalesRepository {
  create(sale: Sale): Promise<void>;
  findById(id: UniqueEntityID): Promise<Sale | null>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Sale[]>;
}
