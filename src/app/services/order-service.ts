import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Purchase} from "../comman/purchase";
import { PaymentStatus} from "../comman/payment_status";
import {OrdersResponse} from "../comman/orders_response";
import {CategoryResponseModel} from "../comman/categoryResponseModel";
import {map} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(private http: HttpClient) {

  }

  createOrder(purchase: Purchase): Observable<any> {
    return this.http.post("http://localhost:8098/create_order", purchase, httpOptions);
  }


  update_payment_status(paymentStatus: any): Observable<any> {
    return this.http.post("http://localhost:8098/update_payment_status", paymentStatus, httpOptions);
  }


  getOrdersByCustomerEmail(data: any): Observable<OrdersResponse[]> {
    return this.http.post<OrdersResponse[]>("http://localhost:8098/find_orders_by_email",data).pipe(
      map(response => response),  // Directly return the array
      catchError(error => {
        console.error('Error fetching categories', error);
        return of([]);  // Return an empty array on error
      })
    );
  }







}
