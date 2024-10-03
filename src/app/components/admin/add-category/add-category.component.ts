import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../../models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{

  categoryForm: FormGroup;
  categoryName:string | null="";
  subCategoryName:string | null="";

  constructor(private fb: FormBuilder, private http: HttpClient,private route: ActivatedRoute,private categoryService: CategoryService,private router: Router) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      //urlSlug: ['', [Validators.required]],
      parentCatCategoriesName: [0], // Default to no parent category
      status: ['', [Validators.required]],
    });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = localStorage.getItem('categoryName'); // The '+' converts the string to a number
    });

    if(this.categoryName=="mainCategory") {
      // @ts-ignore
      this.categoryForm = this.fb.group({
        categoryName: ['', [Validators.required]],
        //urlSlug: ['', [Validators.required]],
        parentCatCategoriesName: [0], // Default to no parent category
        status: ['', [Validators.required]],
      });

    }

    if(this.categoryName=="subCategoryName") {
      // @ts-ignore
      this.subCategoryName =localStorage.getItem('subCategoryName');
      this.categoryForm = this.fb.group({
        categoryName: ['', [Validators.required]],
        //urlSlug: ['', [Validators.required]],
        parentCatCategoriesName: [ this.subCategoryName], // Default to no parent category
        status: ['', [Validators.required]],
      });

    }

  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryDto: Category = this.categoryForm.value;

      this.categoryService.createCategoryByName(categoryDto).subscribe(
        response => {

          // @ts-ignore
          if(response["message"]=='Category created successfully') {
            console.log('Category created successfully', response);
            this.router.navigate(['/select_category']);
          }
        }, error => {
          console.error('Error creating category:', error);
        }
      );

      /*this.http.post('/create_category_by_name', categoryDto).subscribe(
        response => {
          console.log('Category created:', response);
          this.categoryForm.reset(); // Reset form after submission
        },
        error => {
          console.error('Error creating category:', error);
        }
      );*/
    } else {
      console.log('Form is invalid');
    }
  }

}
