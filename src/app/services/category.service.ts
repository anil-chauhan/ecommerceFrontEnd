import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {catchError, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from "../models/product";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8098/get_all_category';

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl).pipe(
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
    categories: Category[];
  }
}
