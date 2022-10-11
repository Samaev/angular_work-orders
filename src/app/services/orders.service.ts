import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get('assets/orders.json');
  }
}
