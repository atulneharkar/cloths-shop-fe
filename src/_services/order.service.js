import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const orderService = {
    addOrder,
    updateOrder,
    getAllOrders,
    getMyOrders
};

function addOrder(orderData) {
  return fetch(`${SERVER_URL}/orders/create`, setHeader('POST', orderData, true)).then((response) => {
    return response.json();
  }).then((userInfo) => {
    saveUserDataToLocalStorage(userInfo);
    return userInfo;
  });
}

function updateOrder(orderId, orderData) {
  return fetch(`${SERVER_URL}/orders/${orderId}`, setHeader('PUT', orderData, true)).then((response) => response.json());
}

function getAllOrders() {
  return fetch(`${SERVER_URL}/orders/list/all/null`, setHeader('GET', null, true)).then((response) => response.json());
}

function getMyOrders(userId) {
  return fetch(`${SERVER_URL}/orders/list/all/${userId}`, setHeader('GET', null, true)).then((response) => response.json());
}

function saveUserDataToLocalStorage(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}