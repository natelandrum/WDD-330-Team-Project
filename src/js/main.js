import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", productData, listElement);

productList.init();

loadHeaderFooter();