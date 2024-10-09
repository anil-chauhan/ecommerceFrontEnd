import {ProductModel} from "./productModel";

export class CartItem {

   private _productId: number;
   private _productName: string;
   private _price: number;  // Use number for decimals in TypeScript
   private _quantity: number;
   private _brand: string;
   private _productImageUrl: string;

  constructor(product:ProductModel) {
    this._productId = product.productId;
    this._productName = product.productName;
    this._price = product.price;
    this._brand = product.brand;
    this._productImageUrl = product.productImageUrl;

    this._quantity = 1;
  }


  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get brand(): string {
    return this._brand;
  }

  set brand(value: string) {
    this._brand = value;
  }

  get productImageUrl(): string {
    return this._productImageUrl;
  }

  set productImageUrl(value: string) {
    this._productImageUrl = value;
  }
}
