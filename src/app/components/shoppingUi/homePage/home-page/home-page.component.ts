import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../../../models/cart-item";
import {CartService} from "../../../../services/cart-service.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../../app-routing.module";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  cartItems: CartItem[]=[]
  // @ts-ignore
  cartItems_str:string | null=[];

  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit(): void {


    this.cartItems_str= localStorage.getItem("cartItems");

    if (typeof this.cartItems_str === "string") {
      this.cartItems = CartItem ? JSON.parse(this.cartItems_str) : [];


      let last_page=localStorage.getItem("lastPage");

      for (let i = 0; i < this.cartItems.length; i++) {
        this.cartService.addToCart( this.cartItems[i])
      }

      if(this.cartItems.length>0) {
        if(last_page!=null) {
          this.router.navigate([last_page]);
        }
      }


    }



  }

}
