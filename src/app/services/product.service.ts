import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {catchError, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from "../models/product";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8098/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductListByCategoryName1(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListByCategoryName(data:any): Observable<Product[]> {
    let productUrl = 'http://localhost:8098/get_all_product_from_a_category_by_name';
    return this.httpClient.post<Product[]>(productUrl,data).pipe(
      map(response => response),  // Directly return the array
      catchError(error => {
        console.error('Error fetching categories', error);
        return of([]);  // Return an empty array on error
      })
    );
  }


}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
