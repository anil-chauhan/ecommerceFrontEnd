import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Country} from "../../comman/country";
import {State} from "../../comman/state";
import {Luv2ShopFormService} from "../../services/luv2-shop-form.service";
import {CartService} from "../../services/cart-service.service";
import {Luv2ShopValidator} from "../../validator/luv2-shop-validator";
import {Router} from "@angular/router";
import {CheckOutService} from "../../services/check-out.service";
import {OrderItem} from "../../comman/order-item";
import {Purchase} from "../../comman/purchase";
import {Order} from "../../comman/order";



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // @ts-ignore
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckOutService,
              private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("lastPage");
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      }),


      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]]
      }),
      billingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]]
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.populateCreditCardData();
    this.populateCountries();
  }

  private populateCreditCardData() {
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.luv2ShopFormService.getCreditCardYears().subscribe(data => {
      console.log("Retrieved credit card years: " + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  private populateCountries() {
    this.luv2ShopFormService.getCountries().subscribe(data => {
      console.log("Retrieved countries: " + JSON.stringify(data));
      this.countries = data;
    });
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);
    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates; // Bug fix for states
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = []; // Bug fix for states
    }
  }

  onSubmit() {
    console.log("Handling the submit button");

    if(this.totalQuantity==0 || this.totalPrice==0){
      return; // Prevent submission if invalid

    }

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return; // Prevent submission if invalid
    }

    // @ts-ignore
    console.log(this.checkoutFormGroup.get('customer').value);
    // @ts-ignore
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
    // @ts-ignore
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    // @ts-ignore
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);



    // set up order
    // @ts-ignore
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    // @ts-ignore
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;





    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );




  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    // @ts-ignore
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number = (currentYear === selectedYear) ? new Date().getMonth() + 1 : 1;

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // @ts-ignore
    const countryId = formGroup.value.country.id;
    // @ts-ignore
    const countryCode = formGroup.value.country.code;
    // @ts-ignore
    const countryName = formGroup.value.country.name;


    console.log(`${formGroupName} country id: ${countryId}`);
    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryId).subscribe(data => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // Select first item by default
      // @ts-ignore
      formGroup.get('state').setValue(data[0]);
    });
  }

}
