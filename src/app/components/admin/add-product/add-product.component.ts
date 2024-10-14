import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ProductModel} from "../../../models/productModel";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoutes} from "../../../app-routing.module";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  productForm: FormGroup;
  categoryName: string | null | undefined;
  productImage: File | null = null;
  subCategoryName: string | null | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute,private router: Router) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      brand: ['', Validators.required],
      productImage: [null, Validators.required] // Set the initial value to null
    });
  }

  onSubmit() {
    if (this.productForm.valid && this.productImage) {
      this.productForm.value.categoryName=this.subCategoryName;
      const productDto: ProductModel = this.productForm.value;
      const formData = new FormData();

      for (const key in productDto) {
        if (productDto.hasOwnProperty(key)) {
          // @ts-ignore
          formData.append(key, productDto[key]);
        }
      }

      formData.append('productImage', this.productImage);

      this.productService.addProduct(formData).subscribe(
        (response) => {
          // @ts-ignore
          if(response["message"]=='Product add successfully') {
            console.log('Product add successfully', response);
            this.router.navigate(['/select_category']);
          }
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productImage = file;
      this.productForm.patchValue({ productImage: file }); // Update the form with the file
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = localStorage.getItem('categoryName');
      this.subCategoryName = localStorage.getItem('subCategoryName');
    });
  }
}
