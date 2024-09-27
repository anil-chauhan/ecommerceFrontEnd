import { Component } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  categories: Category[] | undefined;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.listCategory();
  }

  listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

}
