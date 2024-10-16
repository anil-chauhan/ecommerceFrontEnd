export class PaymentStatus {
    private _razorpay_payment_id: string | undefined;
   private _razorpay_order_id: string | undefined;
   private _razorpay_signature: string | undefined;


  constructor() {
  }


  get razorpay_payment_id(): string | undefined {
    return this._razorpay_payment_id;
  }

  set razorpay_payment_id(value: string | undefined) {
    this._razorpay_payment_id = value;
  }

  get razorpay_order_id(): string | undefined {
    return this._razorpay_order_id;
  }

  set razorpay_order_id(value: string | undefined) {
    this._razorpay_order_id = value;
  }

  get razorpay_signature(): string | undefined {
    return this._razorpay_signature;
  }

  set razorpay_signature(value: string | undefined) {
    this._razorpay_signature = value;
  }
}
