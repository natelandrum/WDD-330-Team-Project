import ProductData from './ProductData.mjs';

const productData = new ProductData("tents");

import ProductList from './ProductList.mjs';
const listElement = document.querySelector(".product-list")

const productList = new ProductList("tents",productData,listElement);

productList.init();