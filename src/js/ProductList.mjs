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
    constructor(category, dataSource, listElement, query = null) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.query = query;
    }
    async init() {
    if (this.category === "all") {
        let all_products = await Promise.all([
            this.dataSource.getData("tents"),
            this.dataSource.getData("sleeping-bags"),
            this.dataSource.getData("backpacks"),
            this.dataSource.getData("hammocks")
        ])
        .then(([tents, sleepingBags, backpacks, hammocks]) => 
            [...tents, ...sleepingBags, ...backpacks, ...hammocks]
        .filter(product => product.Name.toLowerCase().includes(this.query.toLowerCase()))
    );
        this.renderList(all_products);
        document.querySelector(".title").innerHTML = `${capitalize(this.query)} Products`;
    }
    else {
        let products = await this.dataSource.getData(this.category);
        this.renderList(products);
        document.querySelector(".title").innerHTML = capitalize(this.category);
    }

}
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products)
    }
}