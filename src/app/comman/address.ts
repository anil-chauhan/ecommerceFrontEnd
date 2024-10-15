import {state} from "@angular/animations";

export class Address {
    houseNo:string;
    street: string;
    city: string;
    state: string | undefined;
    country: string | undefined;
    zipCode: string;


  constructor(houseNo:string,street: string, city: string, state: string, country: string, zipCode: string) {
    this.houseNo = houseNo;
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }
}
