import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface AlertProps {
  productId: UniqueEntityID;
  type: 'low-stock';
  method: 'e-mail' | 'system';
  createdAt: Date;
  updatedAt?: Date;
}

export class Alert extends Entity<AlertProps> {
  get productId() {
    return this.props.productId;
  }

  get type() {
    return this.props.type;
  }

  get method() {
    return this.props.method;
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

  update({ productId, type, method }: Optional<AlertProps, 'createdAt'>) {
    this.props.productId = productId;
    this.props.type = type;
    this.props.method = method;
    this.touch();
  }

  static create(
    props: Optional<AlertProps, 'createdAt'>,
    id?: UniqueEntityID
  ): Alert {
    const alert = new Alert(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return alert;
  }
}
