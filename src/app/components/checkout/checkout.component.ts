import {Component, HostListener, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
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
import {OrderService} from "../../services/order-service";
import {AuthorizationService} from "../../services/authorization.service";


//const Razorpay = require('razorpay');

declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  /*instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
  });*/


  //RazorpayObj:Razorpay=null

  // @ts-ignore
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  paymentId: string = "";
  errorApp: string = "";

  options = {
    "key": "",
    "key_id": "",
    "amount": "",
    "name": "Coding World",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };


  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckOutService,
              private router: Router, private orderService: OrderService,private authorizationService :AuthorizationService) {
  }

  // @ts-ignore
  ngOnInit(): void {

    let userProfile = this.authorizationService.getUserProfile();

    let userName=userProfile.__zone_symbol__value.username
    let firstName =userProfile.__zone_symbol__value.firstName
    let lastName =userProfile.__zone_symbol__value.lastName
    let email =userProfile.__zone_symbol__value.email

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);


    localStorage.removeItem("lastPage");
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [firstName, [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        lastName: [lastName, [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        email: [email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
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

      /*
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required, Validators.minLength(2), Luv2ShopValidator.notOnlyWhitespace]],
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expirationMonth: [''],
        expirationYear: ['']
      })*/


    });

    //this.populateCreditCardData();
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

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  //get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  //get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  //get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  //get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

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

    if (this.totalQuantity == 0 || this.totalPrice == 0) {
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


    this.onSubmit1(purchase);


    /*// call REST API via the CheckoutService
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
    );*/


  }


  onSubmit1(purchase: Purchase): void {
    this.paymentId = '';
    this.errorApp = '';
    let data = {
      "amount": 80
    }


    this.orderService.createOrder(purchase).subscribe(
      data => {
        this.options.key = data.secretKey;
        this.options.key_id = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "Coding World";
        this.options.prefill.email = "codingworld@gmail.com";
        this.options.prefill.contact = "999999999";


        this.options.image = "";
        var rzp1 = new Razorpay(this.options);
        rzp1.open();


        rzp1.on('payment.failed', (response: {
            error: {
              code: any;
              description: any;
              source: any;
              step: any;
              reason: any;
              metadata: { order_id: any; payment_id: any; };
            };
          }) => {
            // Todo - store this information in the server
            console.log(response);
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            this.errorApp = response.error.reason;
          }
        );
      }
      ,
      err => {
        this.errorApp = err.error.message;
      }
    );
  }


  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any; }): void {
    console.log(event.detail);
    this.resetCart()
  }


  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/order_main_page");
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
