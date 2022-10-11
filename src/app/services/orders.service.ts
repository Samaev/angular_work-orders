import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { IOrder } from '../models/orders';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient,
    private errorService: ErrorService) {}

  public getAll(): Observable<IOrder[]> {
    return this.http
      .get<IOrder[]>('assets/orders.json')
      .pipe(delay(500), retry(2), catchError(this.errorHandler.bind(this)));
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
