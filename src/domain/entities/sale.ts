import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface SaleProps {
  productId: UniqueEntityID;
  quantity: number;
  profit: number;
  saleDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class Sale extends Entity<SaleProps> {
  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  get profit() {
    return this.props.profit;
  }

  get saleDate() {
    return this.props.saleDate;
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
    quantity,
    profit,
    saleDate,
  }: Optional<SaleProps, 'createdAt'>) {
    this.props.productId = productId;
    this.props.quantity = quantity;
    this.props.profit = profit;
    this.props.saleDate = saleDate;
    this.touch();
  }

  static create(
    props: Optional<SaleProps, 'createdAt'>,
    id?: UniqueEntityID
  ): Sale {
    const sale = new Sale(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return sale;
  }
}
