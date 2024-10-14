import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../models/productModel";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart-service.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {




  // @ts-ignore
  product: ProductModel = new ProductModel();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService: CartService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    // @ts-ignore
    const theProductId: number = +this.route.snapshot.paramMap.get('productId');

    let data={
      'productId': theProductId,
    }

    this.productService.getProduct(data).subscribe(
      response => {
        this.product = response;
      }
    )
  }

  addToCart(tempProduct: ProductModel) {

    console.log("product name "+tempProduct.productName);
    console.log("product price "+tempProduct.price);
    let theCartItem=new CartItem(tempProduct) ;
    this.cartService.addToCart(theCartItem);
  }

}
