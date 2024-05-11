import { renderListWithTemplate } from "./utils.mjs";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.NameWithoutBrand}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__list-price hidden"><s>${product.SuggestedRetailPrice.toFixed(2)}</s></p>
              <span class="discounted"></span>
              <p class="product-card__final-price">${product.FinalPrice.toFixed(2)}</p>
            </a>
          </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        let products = await this.dataSource.getData(this.category);
        this.renderList(products);
        document.querySelector(".title").innerHTML = capitalize(this.category);
    }
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products)
    }
}