import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  <img src="/images/delete.svg" alt="Trash SVG by Dazzle UI" class="cart-card__remove" id="${item.Id}">
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

    this.renderTotal();

    document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.currentTarget.id;
        const newCart = cartItems.filter(item => item.Id !== id);
        localStorage.setItem(this.key, JSON.stringify(newCart));
        this.renderCart();
      });
    })
  }
  renderTotal() {
  if (document.querySelector(".total")) {
    document.querySelector(".total").remove();
  }
  const cartItems = getLocalStorage(this.key);
  if (cartItems.length === 0) {
    document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty</p>";
    return;
  }
  const total = cartItems.reduce((acc, item) => acc + item.FinalPrice * item.quantity, 0);
  document.querySelector(this.parentSelector).parentElement.innerHTML += `<p class="total">Total: $${total.toFixed(2)}</p>`;
  }
}
