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
  let cart = getLocalStorage(key);

  if(cart.some(item => item.Id === data.Id)) {
    cart = cart.map(item => {
      if(item.Id === data.Id) {
        return {...item, quanity: item.quanity + 1};
      } else {
        return item;
      }
    });
  } 
  else {
    data.quanity = 1;
    cart.push(data);
  }

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

export function renderDetailsWithTemplate(templateFunction, selector, product) {
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

export function renderWithTemplate(
  template,
  parentElement,
  data,
  position = "beforeend",
  clear = false,
  callback = null
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, template);

  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}