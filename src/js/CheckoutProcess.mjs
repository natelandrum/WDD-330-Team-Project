import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

const services = new ExternalServices();

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
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            this.checkout();
        });
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
        this.total = this.list.reduce((acc, item) => acc + item.FinalPrice * item.quantity, 0);
        this.items = this.list.reduce((acc, item) => acc + item.quantity, 0);

        document.querySelector("#subtotal").textContent = `${this.total} (${this.items} products)`;

        this.tax = this.total * 0.06;
        document.querySelector("#tax").textContent = this.tax.toFixed(2);

        document.querySelector("input[name='zip']").addEventListener("blur", () => {
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

    packageItems() {
        this.itemsObject = Array.from(this.list).map(item => ({
                id: item.Id,
                name: item.Name,
                price: parseFloat(item.FinalPrice.toFixed(2)),
                quantity: item.quantity
            }))
    }

    formToObject(form) {
        let formData = new FormData(form),
        convertedJson = {};

        formData.forEach(function (value, key) {
            convertedJson[key] = value;
        })

        this.formObject = convertedJson;
    }    
    
    async checkout() {
        let form = document.querySelector("form")
        this.formToObject(form);
        this.packageItems();
        
        this.dataObject = {
            ...this.formObject,
            orderDate: new Date().toISOString(),
            items: [
                ...this.itemsObject
            ],
            orderTotal: this.orderTotal.toFixed(2).toString(),
            shipping: this.shipping,
            tax: this.tax.toFixed(2).toString()
        }
        if (this.dataObject.expiration.startsWith("0")) {
            this.dataObject.expiration = this.dataObject.expiration.slice(1);
        }

        try {
            const res = await services.checkout(this.dataObject);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}