import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface SupplierProps {
  name: string;
  phone: string;
  deliveryTimes: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Supplier extends Entity<SupplierProps> {
  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  get deliveryTimes() {
    return this.props.deliveryTimes;
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

  update({ name, phone, deliveryTimes }: Optional<SupplierProps, 'createdAt'>) {
    this.props.name = name;
    this.props.phone = phone;
    this.props.deliveryTimes = deliveryTimes;
    this.touch();
  }

  static create(
    props: Optional<SupplierProps, 'createdAt'>,
    id?: UniqueEntityID
  ): Supplier {
    const supplier = new Supplier(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return supplier;
  }
}
