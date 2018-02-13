import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const productService = {
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    setProductImage,
    removeProduct,
    getProductByCategory,
    addProductToCart,
    removeProductFromCart
};

function addProduct(product) {
  return fetch(`${SERVER_URL}/product/create`, setHeader('POST', product, true)).then((response) => response.json());
}

function updateProduct(productId, product) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('PUT', product, true)).then((response) => response.json());
}

function getAllProducts() {
  return fetch(`${SERVER_URL}/product/list/all`, setHeader('GET', null, true)).then((response) => response.json());
}

function getProductByCategory(category) {
  return fetch(`${SERVER_URL}/product/list/${category}`, setHeader('GET', null, true)).then((response) => response.json());
}

function getProductById(productId) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function removeProduct(productId) {
  return fetch(`${SERVER_URL}/product/${productId}`, setHeader('DELETE', null, true)).then((response) => response.json());
}

function setProductImage(data, productId) {
  return fetch(`${SERVER_URL}/product/productImage/${productId}`, setHeader('POST', data, true, true)).then((response) => response.json());
}

function addProductToCart(productId, userId, productSize) {
  return fetch(`${SERVER_URL}/product/addToCart/${productId}/${userId}`, setHeader('PUT', { productSize }, true)).then((response) => {
    return response.json();
  }).then((userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  });
}

function removeProductFromCart(productId, userId) {
  return fetch(`${SERVER_URL}/product/removeFromCart/${productId}/${userId}`, setHeader('PUT', {}, true)).then((response) => {
    return response.json();
  }).then((userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  });
}