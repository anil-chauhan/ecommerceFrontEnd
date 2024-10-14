import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/productModel";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../services/cart-service.service";
import {CartItem} from "../../../models/cart-item";
import {CustomDialogBoxComponent} from "../cutome-dialog-box/custom-dialog-box.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent implements OnInit{



  // @ts-ignore
  product: ProductModel = new ProductModel();
  totalPrice:number=0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService: CartService,private dialog: MatDialog
    ,private toastr: ToastrService) { }


  ngOnInit(): void {

    window.scrollTo(0, 0); // Scroll to the top
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
    window.scrollTo(0, 0); // Scroll to the top
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

  addToCart1(tempProduct: ProductModel) {

    console.log("product name "+tempProduct.productName);
    console.log("product price "+tempProduct.price);
    let theCartItem=new CartItem(tempProduct) ;
    this.cartService.addToCart(theCartItem);
  }



  addToCart(tempProduct: ProductModel) {

    console.log("product name "+tempProduct.productName);
    console.log("product price "+tempProduct.price);
    let theCartItem=new CartItem(tempProduct) ;
    this.cartService.addToCart(theCartItem);
    this.updateCartStatus();
    //let totalPrice=this.cartService.totalPrice
    let mess:string="product added success in card product name :"+tempProduct.productName+" \n product price "+tempProduct.price
    let mess1:string="total value: "+this.totalPrice
    this.showSuccess(mess,mess1)
  }

  showSuccess(mess:string,mess1:string) {
    this.toastr.success(mess1,mess);
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }



  openDialog(tempProduct: ProductModel): void {
    const dialogRef = this.dialog.open(CustomDialogBoxComponent,{
      width:"350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

        if(result){
          this.addToCart(tempProduct);
        }else {
        }
        console.log('User selected:', result ? 'Yes' : 'No');
      }
    });

  }



}
