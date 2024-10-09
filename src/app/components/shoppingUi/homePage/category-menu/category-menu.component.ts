import {Component, OnInit} from '@angular/core';
import {CategoryTree} from "../../../models/categoryTree";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent implements OnInit{




  childrenAccessor = (node: CategoryTree) => node.subCategories ?? [];

  hasChild = (_: number, node: CategoryTree) => !!node.subCategories && node.subCategories.length > 0;

  constructor(private categoryService: CategoryService,private router: Router) { }


  categories: CategoryTree[] =[]
  dataSource = this.categories;
  ngOnInit() {
    this.listCategory();
  }

  listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        this.dataSource = this.categories;
      }
    )
  }


  goToProduct1(categoryName: any) {
    console.log(categoryName)
    localStorage.setItem("categoryName", categoryName);
    this.router.navigate(['/'+AppRoutes.Product]);
  }


  goToProduct(categoryName: any) {
    console.log(categoryName);
    this.router.navigate(['/' + AppRoutes.Product],  { queryParams: {"categoryName":categoryName}});

  }


}
