import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";
import {CategoryTree} from "../../../models/categoryTree";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.css'
})
export class SelectCategoryComponent implements OnInit {



  childrenAccessor = (node: CategoryTree) => node.subCategories ?? [];

  hasChild = (_: number, node: CategoryTree) => !!node.subCategories && node.subCategories.length > 0;

  constructor(private categoryService: CategoryService,private router: Router,private dialog: MatDialog) { }
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


  onSave(categoryName: any) {
    console.log(categoryName)
    localStorage.setItem("categoryName", categoryName);
    this.router.navigate(['/'+AppRoutes.Product]);
  }

  createMainCategory() {
    localStorage.setItem("categoryName", "mainCategory");
    this.router.navigate(['/'+AppRoutes.AddCategory]);
  }

  createSubCategory(subCategoryName: any) {
    localStorage.setItem("categoryName", "subCategoryName");
    localStorage.setItem("subCategoryName", subCategoryName);
    this.router.navigate(['/'+AppRoutes.AddCategory]);
  }

  openConfirmDialog(subCategoryName: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User chose to go this way.');
        this.createSubCategory(subCategoryName);
        // Add your logic for "Go This Way" option
      } else {
        console.log('User chose to go another way or canceled.');
        // Add your logic for "Go Other Way" option or cancellation
      }
    });
  }


}
