import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {




  // @ts-ignore
  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }


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

}
