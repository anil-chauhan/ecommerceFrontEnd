import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutes} from "../../app-routing.module";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {



  constructor(private router: Router) {
  }

  doSearch(productSearchProductName: string) {

    console.log(`value=${productSearchProductName}`);
    //this.router.navigate([`/search/${productName}`]);
    this.router.navigate(['/' + AppRoutes.SearchProducts], { queryParams: { productSearchProductName } });
  }

  selectCategory() {

  }

  ngOnInit(): void {
  }
}
