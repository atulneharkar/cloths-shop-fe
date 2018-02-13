import { history } from '../_helpers';

import {
  FETCH_USER,
  FETCH_ORDERS,
  FETCH_ORDER,
  ORDER_ERROR
} from '../_constants';

import { orderService } from '../_services';

export const addOrder = function(orderData) {
  return (dispatch) => {
    orderService.addOrder(orderData)
      .then(
        user => {
          dispatch({ 
            type: FETCH_USER,
            payload: user
          });
          history.push("/my-dashboard");
        },
        error => {
          dispatch(orderError('Unable to connect to server.'));
        }
      );
   };
}

export const updateOrder = function(orderId, orderData) {
  return (dispatch) => {
    orderService.updateOrder(orderId, orderData)
      .then(
        order => {
          dispatch(getAllOrders());
        },
        error => {
          dispatch(orderError('Unable to connect to server.'));
        }
      );
   };
}

export const getMyOrders = function(userId) {
  return (dispatch) => {
    orderService.getMyOrders(userId)
      .then(
        orders => {
          dispatch({ 
            type: FETCH_ORDER,
            payload: orders
          });
        },
        error => {
          dispatch(orderError('Unable to connect to server.'));
        }
      );
   };
}

export const getAllOrders = function() {
  return (dispatch) => {
    orderService.getAllOrders()
      .then(
        orders => {
          dispatch({ 
            type: FETCH_ORDERS,
            payload: orders
          });
        },
        error => {
          dispatch(orderError('Unable to connect to server.'));
        }
      );
   };
}

function orderError(error) {
  return {
    type: ORDER_ERROR,
    payload: error
  }
}