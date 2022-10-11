import { Pipe, PipeTransform } from "@angular/core";
import { IOrder } from "../models/orders";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(orders: IOrder[], value: string) {
    return orders.filter(order=>{
      return order.description.toLowerCase().includes(value)
    })
  }
}
