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
  // update product
  // delete product
};
