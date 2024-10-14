import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../../../models/cart-item";
import {CartService} from "../../../../services/cart-service.service";


@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalShippingCharge: number = 50;
  totalQuantity: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

}
