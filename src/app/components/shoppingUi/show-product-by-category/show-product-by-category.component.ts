import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/productModel";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-product-by-category',
  templateUrl: './show-product-by-category.component.html',
  styleUrl: './show-product-by-category.component.css'
})
export class ShowProductByCategoryComponent implements OnInit{

  products: ProductModel[] | undefined;
  categoryId:number=0;

  constructor(private productService: ProductService,private route: ActivatedRoute) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        this.categoryId=params['categoryId']; // Call reload method
      }
    })


    this.getAllProducts(this.categoryId);

    window.scrollTo(0, 0);
  }

  getAllProducts(categoryId:any) {
    //categoryName = localStorage.getItem('categoryName');
    //console.log(categoryName);
    let data = {
      "categoryId": categoryId
    };
    this.productService.getProductsListByCategoryId(data).subscribe(
      data => {
        // @ts-ignore
        this.products = data;
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
