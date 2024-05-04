import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.NameWithoutBrand}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__list-price hidden"><s>${product.SuggestedRetailPrice.toFixed(2)}</s></p>
              <span class="discounted"></span>
              <p class="product-card__final-price">${product.FinalPrice}</p>
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
        let products = await this.dataSource.getData();
        let topProducts = ["880RR", "985RF", "985PR", "344YJ"];
        products = products.filter(product => topProducts.includes(product.Id));
        this.renderList(products);
    }
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products)
    }
}