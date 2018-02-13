import {
  FETCH_ORDERS,
  FETCH_ORDER,
  ORDER_ERROR
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const order = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ORDERS:
      return { ...state, all: action.payload, myOrder: [], orderError: '' }

    case FETCH_ORDER:
      return { ...state, myOrder: action.payload, userError: '' }

    case ORDER_ERROR:
      return { ...state, myOrder: [], userError: action.payload };

    default:
      return state;
  }
}
