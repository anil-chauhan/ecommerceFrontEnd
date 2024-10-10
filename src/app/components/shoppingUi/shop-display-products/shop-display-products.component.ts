import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../services/cart-service.service";
import {ProductModel} from "../../../models/productModel";
import {AppRoutes} from "../../../app-routing.module";

@Component({
  selector: 'app-shop-display-products',
  templateUrl: './shop-display-products.component.html',
  styleUrl: './shop-display-products.component.css'
})
export class ShopDisplayProductsComponent implements OnInit{

  products: ProductModel[] | undefined;

  constructor(private productService: ProductService) { }


  ngOnInit() {

    this.getAllProducts();
  }

    getAllProducts() {
    //categoryName = localStorage.getItem('categoryName');
    //console.log(categoryName);
    let data = {
      "categoryName": ""
    };
    this.productService.getProductsList(data).subscribe(
      data => {
        // @ts-ignore
        this.products = data['content'];
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  doSearchC(productSearchProductName: string) {

    let data = {
      "productName": productSearchProductName
    };
    this.productService.getProductListByProductName(data).subscribe(
      data => {
        // @ts-ignore
        this.products = data['content'];
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );




  }


}
