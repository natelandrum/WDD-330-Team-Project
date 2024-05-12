import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quanity}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCart() {
        const cartItems = getLocalStorage(this.key);
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));

        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        if (cartItems.length === 0) {
            document.querySelector(this.parentSelector).innerHTML = "<p>No items in cart</p>";
        }
        else {
            const total = cartItems.reduce((acc, item) => acc + item.FinalPrice * item.quanity, 0);
            document.querySelector(this.parentSelector).parentElement.innerHTML += `<p class="total">Total: $${total.toFixed(2)}</p>`;
        }
    }
}
