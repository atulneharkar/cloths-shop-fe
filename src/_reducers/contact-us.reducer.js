import {
  FETCH_QUERIES,
  QUERY_ERROR,
  QUERY_SUCCESS,
  QUERY_LOADING,
  QUERY_UNLOADING
} from '../_constants';

const INITIAL_STATE = { all: [] };

export const contactUs = function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_QUERIES:
      return { ...state, all: action.payload, queryError: '', querySuccess: false, queryLoading: false }

    case QUERY_ERROR:
      return { ...state, queryError: action.payload, querySuccess: false, queryLoading: false };

    case QUERY_SUCCESS:
      return { ...state, queryError: '', querySuccess: true, queryLoading: false };

    case QUERY_LOADING:
      return { ...state, queryError: '', querySuccess: false, queryLoading: true };

    case QUERY_UNLOADING:
      return { ...state, queryError: '', querySuccess: false, queryLoading: false };

    default:
      return state;
  }
}
