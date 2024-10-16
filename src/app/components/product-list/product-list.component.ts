import { Component,OnInit } from '@angular/core';
import {ProductModel} from "../../models/productModel";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart-service.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: ProductModel[] | undefined;
  categoryName: any;

  constructor(private productService: ProductService, private route: ActivatedRoute,private cartServiceService: CartService) { }

  ngOnInit() {

    console.log("product list page")
    // Subscribe to query params to handle reload
    this.route.queryParams.subscribe(params => {
      if (params['reload']) {
        this.reloadProductData(); // Call reload method
      }

      if (params['productSearchProductName']) {

        let productName = params['productSearchProductName'];
        this.searchProductsByName(productName);



      }

      if (params['categoryName']) {

        // Get category name from local storage and load products
        this.categoryName = params['categoryName'];
        this.listProducts(this.categoryName);

      }

      if (params['categoryName']===undefined) {

        // Get category name from local storage and load products
        this.categoryName = params['categoryName'];
        this.getAllProducts();

      }




    });




  }

  listProducts(categoryName: any) {
    //categoryName = localStorage.getItem('categoryName');
    //console.log(categoryName);
    let data = {
      "categoryName": categoryName
    };
    this.productService.getProductListByCategoryName(data).subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
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


  searchProductsByName(productName: any) {
    //categoryName = localStorage.getItem('categoryName');
    //console.log(categoryName);
    let data = {
      "productName": productName
    };
    this.productService.getProductListByProductName(data).subscribe(
      response => {
        // @ts-ignore
        this.products = response['content'];
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }





  reloadProductData() {
    // Call listProducts again with the current categoryName
    this.listProducts(this.categoryName);
  }

  addToCart(tempProduct: ProductModel) {

    console.log("product name "+tempProduct.productName);
    console.log("product price "+tempProduct.price);
    let theCartItem=new CartItem(tempProduct) ;
    this.cartServiceService.addToCart(theCartItem);
  }
}
