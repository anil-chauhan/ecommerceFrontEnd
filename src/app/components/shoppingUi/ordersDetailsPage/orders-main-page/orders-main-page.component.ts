import {Component, HostListener, OnInit} from '@angular/core';




import {Observable} from "rxjs";
import {OrderService} from "../../../../services/order-service";
import {AuthorizationService} from "../../../../services/authorization.service";
import {CartService} from "../../../../services/cart-service.service";
import {PaymentStatus} from "../../../../comman/payment_status";
import {OrdersResponse} from "../../../../comman/orders_response";
import {CategoryService} from "../../../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../../app-routing.module";


declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors
@Component({
  selector: 'app-orders-main-page',
  templateUrl: './orders-main-page.component.html',
  styleUrl: './orders-main-page.component.css'
})
export class OrdersMainPageComponent implements OnInit {


  //myOrders: OrdersResponse[] = []
  userEmail:string="";
  errorApp: string = "";


  // @ts-ignore
  myOrders$: Observable<OrdersResponse[]>;
  ordersLoaded: boolean = false;





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

  constructor(private orderService: OrderService,private authorizationService :AuthorizationService,
              private cartService: CartService, private router: Router) {
    this.loginStatus()
    this.getOrders(this.userEmail)
  }


  ngOnInit(): void {


  }


  loginStatus() {

    if(this.authorizationService.isLoggedIn()){
      let userProfile = this.authorizationService.getUserProfile();
      this.userEmail=userProfile.__zone_symbol__value.username;
    }else {
      //this.login_status="Login"
    }
  }


  getOrders(email:string) {


    let myData = {

      "customerEmail":email
    }

    this.myOrders$ = this.orderService.getOrdersByCustomerEmail(myData);

    this.myOrders$.subscribe(() => {
      this.ordersLoaded = true;
    });



    /*this.orderService.getOrdersByCustomerEmail(myData).subscribe(data => {
      console.log("Retrieved countries: " + JSON.stringify(data));
      this.myOrders = data;

    });*/

  }


  pay_pending_payment(razorpayOrderId: string) {

    let myData = {
      "razorpayOrderId": razorpayOrderId
    }


    this.orderService.pay_pending_payment(myData).subscribe(
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

    event.detail.razorpay_payment_id

    let paymentStatus:PaymentStatus= new PaymentStatus()
    paymentStatus.razorpay_payment_id=event.detail.razorpay_payment_id
    paymentStatus.razorpay_order_id=event.detail.razorpay_order_id
    paymentStatus.razorpay_signature=event.detail.razorpay_signature


    let data={

      "razorpayPaymentId":event.detail.razorpay_payment_id,
      "razorpayOrderId":event.detail.razorpay_order_id,
      "razorpaySignature":event.detail.razorpay_signature
    }





    this.update_payment_status(data)
    this.getOrders(this.userEmail)
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    window.location.reload();

  }

  update_payment_status(paymentStatus: any){
    this.orderService.update_payment_status(paymentStatus).subscribe(data => {
      console.log("Retrieved countries: " + JSON.stringify(data));

    });
  }


  show_ordered_items(orderId: number,totalPrice: number) {
    this.router.navigate(['/'+AppRoutes.ShowOrderedItems],  { queryParams: {"orderId":orderId,"totalPrice":totalPrice}});

  }
}
