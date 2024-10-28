import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import ShippedOrdersCannotBeChangedException from '../exception/ShippedOrdersCannotBeChangedException';
import RejectedOrderCannotBeApprovedException from '../exception/RejectedOrderCannotBeApprovedException';
import ApprovedOrderCannotBeRejectedException from "../exception/ApprovedOrderCannotBeRejectedException";

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
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
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

  public setTax(tax: number): void {
    this.tax = tax;
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

  public setId(id: number): void {
    this.id = id;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);

    this.total += item.getTaxedAmount();
    this.tax += item.getTax();
  }

  public approve(): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    } else if (this.status === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    } else {
      this.status = OrderStatus.APPROVED;
    }
  }

  public reject(): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    } else if (this.status === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    } else {
      this.status = OrderStatus.REJECTED;
    }
  }
}

export default Order;

