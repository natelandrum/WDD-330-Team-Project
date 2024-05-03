export default class ProductListing {
    // Method to generate HTML template for a product card
    static productCardTemplate(product) {
        return `
            <li class="product-card">
                <a href="product_pages/index.html?product=${product.id}">
                    <img src="${product.imageUrl}" alt="Image of ${product.name}">
                    <h3 class="card_brand">${product.brand}</h3>
                    <h2 class="card_name">${product.name}</h2>
                    <p class="product-card__price">$${product.price}</p>
                </a>
            </li>`;
    }

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const productList = await this.dataSource();
        this.renderProductList(productList);
    }

    renderProductList(productList) {
        const html = productList.map(product => this.productCardTemplate(product)).join('');
        this.listElement.innerHTML = html;
    }
}
