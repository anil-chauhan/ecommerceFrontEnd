export class Product {
  private _productName: string;
  private _urlSlug: string;
  private _categoryId: number;
  private _description: string;
  private _categoryName: string;
  private _price: number;  // Use number for decimals in TypeScript
  private _stockQuantity: number;
  private _status: string;
  private _brand: string;
  private _productImageUrl: string;

  constructor(
    productName: string,
    urlSlug: string,
    categoryId: number,
    description: string,
    categoryName:string,
    price: number,
    stockQuantity: number,
    status: string,
    brand: string,
    productImageUrl: string
  ) {
    this._productName = productName;
    this._urlSlug = urlSlug;
    this._categoryId = categoryId;
    this._description = description;
    this._categoryName = categoryName;
    this._price = price;
    this._stockQuantity = stockQuantity;
    this._status = status;
    this._brand = brand;
    this._productImageUrl = productImageUrl;
  }

  // Getters
  get productName(): string {
    return this._productName;
  }

  get urlSlug(): string {
    return this._urlSlug;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  get status(): string {
    return this._status;
  }

  get brand(): string {
    return this._brand;
  }

  get productImageUrl(): string {
    return this._productImageUrl;
  }

  // Setters
  set productName(value: string) {
    this._productName = value;
  }

  set urlSlug(value: string) {
    this._urlSlug = value;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set price(value: number) {
    this._price = value;
  }

  set stockQuantity(value: number) {
    this._stockQuantity = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set brand(value: string) {
    this._brand = value;
  }

  set productImageUrl(value: string) {
    this._productImageUrl = value;
  }

  get categoryName(): string {
    return this._categoryName;
  }

  set categoryName(value: string) {
    this._categoryName = value;
  }
}
