import { Component,OnInit } from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app-routing.module";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories: Category[] | undefined;
  is_sub_category_available: boolean | undefined;

  constructor(private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
    this.listCategory();
  }

  listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data => {
        //this.categories = data;
      }
    )
  }

  getProductsOrCategory(categoryName: string) {

    let dataCategory={
      "categoryName":categoryName
    }

    this.categoryService.isSubCategoryAvailable(dataCategory).subscribe(
      response => {
        this.is_sub_category_available = response;
        if(this.is_sub_category_available){
          console.log(this.is_sub_category_available)
          this.router.navigate(['/'+AppRoutes.SubCategory, dataCategory]);
        }
        else {
          console.log(this.is_sub_category_available)
          console.log(dataCategory)
          this.router.navigate(['/'+AppRoutes.Product, dataCategory]);
        }
      }
    )


  }
}
