import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-just-arrived-products',
  templateUrl: './just-arrived-products.component.html',
  styleUrl: './just-arrived-products.component.css'
})
export class JustArrivedProductsComponent implements OnInit{

  products: Product[] | undefined;

  constructor(private productService: ProductService) { }


  ngOnInit() {

    console.log("product list page")
    // Subscribe to query params to handle reload

    this.getAllTrendyProductsList()

  }


  getAllTrendyProductsList() {
    //categoryName = localStorage.getItem('categoryName');
    //console.log(categoryName);
    let data = {
      //"categoryName": ""
    };
    this.productService.getAllTrendyProductsList(data).subscribe(
      data => {
        // @ts-ignore
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }


}
