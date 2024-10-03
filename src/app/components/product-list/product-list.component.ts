import { Component,OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] | undefined;
  categoryName: any;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to query params to handle reload
    this.route.queryParams.subscribe(params => {
      if (params['reload']) {
        this.reloadProductData(); // Call reload method
      }
    });

    // Get category name from local storage and load products
    this.categoryName = localStorage.getItem('categoryName');
    this.listProducts(this.categoryName);
  }

  listProducts(categoryName: any) {
    categoryName = localStorage.getItem('categoryName');
    console.log(categoryName);
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

  reloadProductData() {
    // Call listProducts again with the current categoryName
    this.listProducts(this.categoryName);
  }
}
