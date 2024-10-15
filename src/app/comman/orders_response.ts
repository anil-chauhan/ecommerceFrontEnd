export class OrdersResponse {

  private _id:number=0;
  private _orderTrackingNumber:string="";
  private _totalQuantity:number=0;
  private _totalPrice:number=0;
  private _orderStatus:string="";
  private _paymentStatus:string="";
  private _razorpayPaymentId:string="";
  private _razorpayOrderId:string="";
  private _dateCreated:string="";
  private _lastUpdated:string="";


  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get orderTrackingNumber(): string {
    return this._orderTrackingNumber;
  }

  set orderTrackingNumber(value: string) {
    this._orderTrackingNumber = value;
  }

  get totalQuantity(): number {
    return this._totalQuantity;
  }

  set totalQuantity(value: number) {
    this._totalQuantity = value;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set totalPrice(value: number) {
    this._totalPrice = value;
  }

  get orderStatus(): string {
    return this._orderStatus;
  }

  set orderStatus(value: string) {
    this._orderStatus = value;
  }

  get paymentStatus(): string {
    return this._paymentStatus;
  }

  set paymentStatus(value: string) {
    this._paymentStatus = value;
  }

  get razorpayPaymentId(): string {
    return this._razorpayPaymentId;
  }

  set razorpayPaymentId(value: string) {
    this._razorpayPaymentId = value;
  }

  get razorpayOrderId(): string {
    return this._razorpayOrderId;
  }

  set razorpayOrderId(value: string) {
    this._razorpayOrderId = value;
  }

  get dateCreated(): string {
    return this._dateCreated;
  }

  set dateCreated(value: string) {
    this._dateCreated = value;
  }

  get lastUpdated(): string {
    return this._lastUpdated;
  }

  set lastUpdated(value: string) {
    this._lastUpdated = value;
  }
}
