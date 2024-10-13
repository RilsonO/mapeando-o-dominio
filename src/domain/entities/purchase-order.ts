import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface PurchaseOrderProps {
  productId: UniqueEntityID;
  quantity: number;
  status: 'pending' | 'in-transit' | 'out-for-delivery' | 'delivered';
  orderDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  get productId() {
    return this.props.productId;
  }

  get status() {
    return this.props.status;
  }

  get orderDate() {
    return this.props.orderDate;
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
    status,
    orderDate,
    quantity,
  }: Optional<PurchaseOrderProps, 'createdAt'>) {
    this.props.productId = productId;
    this.props.status = status;
    this.props.orderDate = orderDate;
    this.props.quantity = quantity;
    this.touch();
  }

  static create(
    props: Optional<PurchaseOrderProps, 'createdAt'>,
    id?: UniqueEntityID
  ): PurchaseOrder {
    const purchaseOrder = new PurchaseOrder(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return purchaseOrder;
  }
}
