import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface ProductProps {
  name: string;
  size: string;
  color: string;
  quantity: number;
  minimumQuantity: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }

  get size() {
    return this.props.size;
  }

  get color() {
    return this.props.color;
  }

  get quantity() {
    return this.props.quantity;
  }

  get minimumQuantity() {
    return this.props.minimumQuantity;
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
    name,
    size,
    color,
    quantity,
    minimumQuantity,
  }: Optional<ProductProps, 'createdAt'>) {
    this.props.name = name;
    this.props.size = size;
    this.props.color = color;
    this.props.quantity = quantity;
    this.props.minimumQuantity = minimumQuantity;
    this.touch();
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityID
  ): Product {
    const product = new Product(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return product;
  }
}
