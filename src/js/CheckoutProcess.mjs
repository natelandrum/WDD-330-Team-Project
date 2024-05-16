import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key) {
        this.key = key;
        this.list = [];
        this.total = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
    this.list = getLocalStorage(this.key);
        if (this.list.length === 0) {
            document.querySelector("#subtotal").textContent = "0.00";
            document.querySelector("#shipping").textContent = "0.00";
            document.querySelector("#tax").textContent = "0.00";
            document.querySelector("#order-total").textContent = "0.00";
            return;
        }
        this.total = this.list.reduce((acc, item) => acc + item.FinalPrice * item.quanity, 0);
        this.items = this.list.reduce((acc, item) => acc + item.quanity, 0);

        document.querySelector("#subtotal").textContent = `${this.total} (${this.items} products)`;

        this.tax = this.total * 0.06;
        document.querySelector("#tax").textContent = this.tax.toFixed(2);

        document.querySelector("input[name='zip-code']").addEventListener("blur", () => {
            this.calculateShipping();
        })
    }

    calculateOrderTotal() {
        this.orderTotal = this.total + this.shipping + this.tax;
        document.querySelector("#order-total").textContent = this.orderTotal.toFixed(2);
    }

    calculateShipping() {
    let baseShippingCost = 10;
    let additionalItemCost = 2;
    let numberOfAdditionalItems = this.items - 1;

    this.shipping = baseShippingCost + additionalItemCost * numberOfAdditionalItems;

    document.querySelector("#shipping").textContent = this.shipping.toFixed(2);
    this.calculateOrderTotal();
}
}