import type { ItemInterface } from "@/interfaces/item";

export interface SalesOrderInterface {
  _id: string;
  date: Date;
  salesRep: string;
  salesOrderId: string;
  customer: string;
  address: string;
  note: string;
  salesOrderItems: ItemInterface[];
}
