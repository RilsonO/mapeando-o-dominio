import { Alert } from '@/domain/entities/alert';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AlertsRepository {
  create(alert: Alert): Promise<void>;
  findById(id: UniqueEntityID): Promise<Alert | null>;
  find(criteria: Partial<Alert>): Promise<Alert | null>;
}
