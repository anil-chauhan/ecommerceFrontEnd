import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Purchase} from "../comman/purchase";


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

}
