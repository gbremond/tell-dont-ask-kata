import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import ShippedOrdersCannotBeChangedException from '../exception/ShippedOrdersCannotBeChangedException';
import RejectedOrderCannotBeApprovedException from '../exception/RejectedOrderCannotBeApprovedException';
import ApprovedOrderCannotBeRejectedException from '../exception/ApprovedOrderCannotBeRejectedException';

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  constructor() {
    this.total = 0;
    this.currency = 'EUR';
    this.items = [];
    this.tax = 0;
    this.status = OrderStatus.CREATED;
    this.id = Math.floor(Math.random() * 1000000);
  }

  public getTotal(): number {
    return this.total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getTax(): number {
    return this.tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);

    this.total += item.getTaxedAmount();
    this.tax += item.getTax();
  }

  public approve(): void {
    if (this.isShipped()) {
      throw new ShippedOrdersCannotBeChangedException();
    } else if (this.isRejected()) {
      throw new RejectedOrderCannotBeApprovedException();
    } else {
      this.status = OrderStatus.APPROVED;
    }
  }

  public reject(): void {
    if (this.isShipped()) {
      throw new ShippedOrdersCannotBeChangedException();
    } else if (this.isApproved()) {
      throw new ApprovedOrderCannotBeRejectedException();
    } else {
      this.status = OrderStatus.REJECTED;
    }
  }

  public ship() : void {
    this.status = OrderStatus.SHIPPED;
  }

  public isRejected() {
    return this.status === OrderStatus.REJECTED;
  }

  public isApproved() {
    return this.status === OrderStatus.APPROVED;
  }

  public isShipped() {
    return this.status === OrderStatus.SHIPPED;
  }
}

export default Order;

