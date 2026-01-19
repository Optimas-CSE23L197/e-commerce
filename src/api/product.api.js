import { axiosClient } from "./axiosClient";

export const productApi = {
  // fetch products
  fetchProducts: () => {
    return axiosClient.get("/products");
  },

  // get product by id
  getProductById: (productId) => {
    return axiosClient.get(`/products/${productId}`);
  },

  // get categories
  getProductByCategory: (categoryName) => {
    return axiosClient.get(`/products/category/${categoryName}`);
  },

  // add product
  addProduct: () => {
    return axiosClient.post("/products/add");
  },
  // update product
  // delete product

  // sort by title
  sortByTitle: () => {
    return axiosClient.get("/products?sortBy=title&order=asc'");
  },
  // sort by price
};
