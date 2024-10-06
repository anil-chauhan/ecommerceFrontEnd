import {CartItem} from "../models/cart-item";


export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.productImageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.price;
        this.productId = cartItem.productId;
    }
}
