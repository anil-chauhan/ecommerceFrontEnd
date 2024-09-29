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
  categoryName:any;

  constructor(private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.categoryName = localStorage.getItem('categoryName'); // The '+' converts the string to a number
    });
    this.listProducts( this.categoryName);
  }

  listProducts( categoryName:any) {
    console.log(categoryName)
    let data={
    "categoryName":categoryName
    }
    this.productService.getProductListByCategoryName(data).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
