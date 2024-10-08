import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Country} from "../comman/country";
import {State} from "../comman/state";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  ip:string=environment['ip']

  private countriesUrl = 'http://'+this.ip+':8098/countries';
  private statesUrl = 'http://'+this.ip+':8098/';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    let data={}
    return this.httpClient.post<any>(this.countriesUrl,data).pipe(
      map(response => response),
    );
  }

  getStates(theCountryCode: number): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}findByCountryCode`;

    let data={
      "countryCode":theCountryCode
    }

    return this.httpClient.post<any>(searchStatesUrl,data).pipe(
      map(response => response)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }



}
