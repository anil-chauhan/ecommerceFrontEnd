import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../services/category.service";
import {Router} from "@angular/router";

import {CategoryResponseModel} from "../../../../comman/categoryResponseModel";
import {AppRoutes} from "../../../../app-routing.module";

@Component({
  selector: 'app-category-details-section',
  templateUrl: './category-details-section.component.html',
  styleUrl: './category-details-section.component.css'
})
export class CategoryDetailsSectionComponent implements OnInit{

  constructor(private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
    this.listCategory();
  }

  categories: CategoryResponseModel[] =[]
  //dataSource = this.categories;

  listCategory() {
    this.categoryService.getCategoryDetailsList().subscribe(
      data => {
        this.categories = data;
        //this.dataSource = this.categories;
      }
    )
  }

  showProductByCategory(categoryId: number) {

    this.router.navigate(['/' + AppRoutes.ShowProductByCategory],  { queryParams: {"categoryId":categoryId}});


  }
}
