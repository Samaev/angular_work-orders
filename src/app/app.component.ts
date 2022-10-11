import { Component, OnInit } from '@angular/core';
import { IOrder } from './models/orders';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular_work-orders';
  orders: IOrder[] = [];
  visibleOrders: IOrder[] = this.orders;
  searchStr = '';
  ordersPerPage = 8;
  public selectedPage = 1;
  today = Date.now();
  fixedTimezone = this.today;
  date = new Date();

  constructor(private ordersService: OrdersService) {}


  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.ordersPerPage;
    this.visibleOrders = this.orders.slice(pageIndex, this.ordersPerPage);
    this.ordersService.getAll().subscribe((data: any) => {
      this.orders = data['response']['data'];
      this.visibleOrders = this.orders;
      return this.orders;
    });
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  changeOrderList(event: any) {
    const newSize = (event.target as HTMLInputElement).value;
    this.ordersPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.orders.length / this.ordersPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number) {
    this.selectedPage = page;
    this.slicedOrders();
  }

  slicedOrders() {
    let pageIndex = (this.selectedPage - 1) * this.ordersPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.ordersPerPage + this.ordersPerPage;
    this.visibleOrders = [];
    this.visibleOrders = this.orders.slice(pageIndex, endIndex);
  }
}
