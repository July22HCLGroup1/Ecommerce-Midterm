import { Address } from "./address";

export class OrderInfo {
    shippingAddress: Address;
    billingAddress: Address;
    sameAddress: boolean;

    constructor(){
        this.shippingAddress = new Address();
        this.billingAddress = new Address();
        this.sameAddress = true;
    }
}