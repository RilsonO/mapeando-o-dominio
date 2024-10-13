import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface InventoryMovementProps {
  productId: UniqueEntityID;
  type: 'inbound' | 'outbound';
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class InventoryMovement extends Entity<InventoryMovementProps> {
  get productId() {
    return this.props.productId;
  }

  get type() {
    return this.props.type;
  }

  get quantity() {
    return this.props.quantity;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  update({
    productId,
    type,
    quantity,
  }: Optional<InventoryMovementProps, 'createdAt'>) {
    this.props.productId = productId;
    this.props.type = type;
    this.props.quantity = quantity;
    this.touch();
  }

  static create(
    props: Optional<InventoryMovementProps, 'createdAt'>,
    id?: UniqueEntityID
  ): InventoryMovement {
    const inventoryMovement = new InventoryMovement(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return inventoryMovement;
  }
}
