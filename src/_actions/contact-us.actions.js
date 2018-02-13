import {
  FETCH_QUERIES,
  QUERY_ERROR,
  QUERY_SUCCESS,
  QUERY_LOADING
} from '../_constants';

import { contactUsService } from '../_services';

export const addQuery = function(query) {
  return (dispatch) => {
    dispatch({ type: QUERY_LOADING });
    contactUsService.addQuery(query)
      .then(
        query => {
          dispatch({ type: QUERY_SUCCESS });
        },
        error => {
        	dispatch({
            type: QUERY_ERROR,
            payload: error
          });
        }
      );
   };
}

export const updateQuery = function(queryId, query) {
  return (dispatch) => {
    dispatch({ type: QUERY_LOADING });
    contactUsService.updateQuery(queryId, query)
      .then(
        query => {
          dispatch(getQueryList());
        },
        error => {
          dispatch({
            type: QUERY_ERROR,
            payload: error
          });
        }
      );
   };
}

export const getQueryList = function() {
  return (dispatch) => {
    dispatch({ type: QUERY_LOADING });
    contactUsService.getAllQueries()
      .then(
        queries => {
          dispatch({ 
            type: FETCH_QUERIES,
            payload: queries
          });
        },
        error => {
          dispatch({
            type: QUERY_ERROR,
            payload: error
          });
        }
      );
   };
}