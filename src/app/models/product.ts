export class Product {
  get lastUpdate(): Date {
    return <Date>this._lastUpdate;
  }

  set lastUpdate(value: Date) {
    this._lastUpdate = value;
  }
  get dateCreated(): Date {
    return <Date>this._dateCreated;
  }

  set dateCreated(value: Date) {
    this._dateCreated = value;
  }
  get unitsInStock(): number {
    return <number>this._unitsInStock;
  }

  set unitsInStock(value: number) {
    this._unitsInStock = value;
  }
  get active(): boolean {
    return <boolean>this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
  get imageUrl(): string {
    return <string>this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }
  get unitPrice(): number {
    return <number>this._unitPrice;
  }

  set unitPrice(value: number) {
    this._unitPrice = value;
  }
  get description(): string {
    return <string>this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  get sku(): string {
    return <string>this._sku;
  }

  set sku(value: string) {
    this._sku = value;
  }
    private _sku: string | undefined;
    name: string | undefined;
    private _description: string | undefined;
    private _unitPrice: number| undefined;
    private _imageUrl: string| undefined;
    private _active: boolean| undefined;
    private _unitsInStock: number| undefined;
    private _dateCreated: Date| undefined;
    private _lastUpdate: Date| undefined;
}
