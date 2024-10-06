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



  getProduct(theProductId: any): Observable<Product> {
    // need to build URL based on product id
    const productUrl = "http://localhost:8098/get_product_by_id";
    return this.httpClient.post<Product>(productUrl,theProductId);
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



  getProductListByProductName(data:any): Observable<Product[]> {
    let productUrl = 'http://localhost:8098/get_all_product_by_name';
    return this.httpClient.post<Product[]>(productUrl,data).pipe(
      map(response => response),  // Directly return the array
      catchError(error => {
        console.error('Error fetching categories', error);
        return of([]);  // Return an empty array on error
      })
    );
  }

  getProductsList(data:any): Observable<Product[]> {
    let productUrl = 'http://localhost:8098/get_all_product';
    return this.httpClient.post<Product[]>(productUrl,data).pipe(
      map(response => response),  // Directly return the array
      catchError(error => {
        console.error('Error fetching categories', error);
        return of([]);  // Return an empty array on error
      })
    );
  }


/*
  addProduct(data:any): Observable<string> {
    let productUrl = 'http://localhost:8098/add_product';
    return this.httpClient.post<string>(productUrl,data).pipe(
      map(response => response),  // Directly return the array
      catchError(error => {
        console.error('Error fetching categories', error);
        return of();  // Return an empty array on error
      })
    );
  }
*/



  addProduct(data: FormData): Observable<string> {
    const productUrl = 'http://localhost:8098/add_product';
    return this.httpClient.post<string>(productUrl, data).pipe(
      map(response => response as string),  // Ensure response is cast correctly
      catchError(error => {
        console.error('Error adding product', error);
        return of('');  // Return an empty string on error for better handling
      })
    );
  }


}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
