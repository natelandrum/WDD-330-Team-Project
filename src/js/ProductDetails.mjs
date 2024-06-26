import { setLocalStorage, renderDetailsWithTemplate } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__list-price hidden"><s>${product.SuggestedRetailPrice.toFixed(2)}</s></p>
        <span class="discounted"></span>
        <p class="product-card__final-price">${product.FinalPrice.toFixed(2)}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
            ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        renderDetailsWithTemplate(productDetailsTemplate, "main", this.product);

        document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }
    addToCart() {
        setLocalStorage("so-cart", this.product);
    }
}