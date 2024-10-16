import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../../models/cart-item";
import {CartService} from "../../../services/cart-service.service";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalShippingCharge: number = 50;
  totalQuantity: number = 0;


  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {


    localStorage.removeItem("cartItems");
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));

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

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
    localStorage.removeItem("cartItems");
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
    localStorage.removeItem("cartItems");
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
    localStorage.removeItem("cartItems");
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }



    go_to_checkout() {

      localStorage.removeItem("cartItems");

    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      localStorage.setItem("lastPage", "/checkout_page");

    this.router.navigate(['/checkout_page']);


    }
}
