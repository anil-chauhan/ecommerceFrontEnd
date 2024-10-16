import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {OrdersResponse} from "../../../../comman/orders_response";
import {OrderService} from "../../../../services/order-service";
import {AuthorizationService} from "../../../../services/authorization.service";
import {CartService} from "../../../../services/cart-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentStatus} from "../../../../comman/payment_status";
import {AppRoutes} from "../../../../app-routing.module";
import {CartItem} from "../../../../models/cart-item";

@Component({
  selector: 'app-show-ordered-items',
  templateUrl: './show-ordered-items.component.html',
  styleUrl: './show-ordered-items.component.css'
})
export class ShowOrderedItemsComponent  implements OnInit{



  myOrders: CartItem[] = []
  orderId:string="";
  errorApp: string = "";


  // @ts-ignore
  //myOrders$: Observable<OrdersResponse[]>;
  //ordersLoaded: boolean = false;
  protected ordersLoaded: boolean;
  protected totalPrice: number=0;



  constructor(private orderService: OrderService,private authorizationService :AuthorizationService,
              private cartService: CartService, private router: Router, private route: ActivatedRoute) {


  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      if (params['orderId']) {
        this.orderId=params['orderId']; // Call reload method
      }
      if (params['totalPrice']) {
        this.totalPrice=params['totalPrice']; // Call reload method
      }

    })

    this.getOrders(this.orderId)


  }





  getOrders(orderId:string) {


    let myData = {

      "orderId":orderId
    }

    this.orderService.getOrderItemsByOrderId(myData).subscribe(
      data => {
        this.ordersLoaded = true;
        this.myOrders=data
      }
    );




  }








  show_ordered_items(orderId: number) {
    this.router.navigate(['/'+AppRoutes.ShowOrderedItems],  { queryParams: {"orderId":orderId}});

  }

}
