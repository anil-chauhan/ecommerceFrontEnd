import {Component, inject, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../models/productModel";
import {CartItem} from "../../../models/cart-item";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../services/cart-service.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {CustomDialogBoxComponent} from "../cutome-dialog-box/custom-dialog-box.component";

@Component({
  selector: 'app-product-display-card',
  templateUrl: './product-display-card.component.html',
  styleUrl: './product-display-card.component.css'
})
export class ProductDisplayCardComponent implements OnInit{

  @Input() products: ProductModel[] | undefined = []; // Accept products as input
  totalPrice:number=0;

  ngOnInit(): void {

  }
  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService: CartService,private toastr: ToastrService
  ,private dialog: MatDialog) { }

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
