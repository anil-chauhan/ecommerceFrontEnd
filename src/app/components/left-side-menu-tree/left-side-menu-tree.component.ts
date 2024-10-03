import {Component, OnInit} from '@angular/core';
import {CategoryTree} from "../../models/categoryTree";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app-routing.module";




@Component({
  selector: 'app-left-side-menu-tree',
  templateUrl: './left-side-menu-tree.component.html',
  styleUrl: './left-side-menu-tree.component.css'
})

export class LeftSideMenuTreeComponent implements OnInit{



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
    const currentCategoryName = localStorage.getItem("categoryName");

    // Check if the category name is the same
    if (currentCategoryName !== categoryName) {
      // Store the new category name and navigate
      localStorage.setItem("categoryName", categoryName);
      this.router.navigate(['/' + AppRoutes.Product], { queryParams: { reload: Date.now() } });
    } else {
      localStorage.setItem("categoryName", categoryName);
      // Reload the current route to refresh data
      this.router.navigate(['/' + AppRoutes.Product], { queryParams: { reload: Date.now() } });
    }
  }


}
