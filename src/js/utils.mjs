// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
// save data to local storage
export function setLocalStorage(key, data) {
  const cart = getLocalStorage(key);
  cart.push(data);
  localStorage.setItem(key, JSON.stringify(cart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFunction,
  parentElement,
  list,
  position = "beforeend",
  clear = false
) {
  const htmlStrings = list.map(templateFunction);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  list.forEach((product, index) => {
    const element = parentElement.children[index];
    checkDiscount(product, element);
  });
}

export function rednerDetailsWithTemplate(templateFunction, selector, product) {
  const element = document.querySelector(selector);
  element.insertAdjacentHTML("afterbegin", templateFunction(product));
  checkDiscount(product, element);
}

function checkDiscount(product, selector) {
  if (product.SuggestedRetailPrice > product.FinalPrice) {
      selector.querySelector(".product-card__list-price").classList.remove("hidden");
      selector.querySelector(".product-card__final-price").classList.add("discount");
      selector.querySelector(".discounted").textContent = `(-$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)})`;
  }
}