import 'whatwg-fetch';

import { setHeader } from '../_helpers';
import { SERVER_URL } from '../_constants';

export const contactUsService = {
    addQuery,
    updateQuery,
    getAllQueries
};

function addQuery(query) {
  return fetch(`${SERVER_URL}/query/create`, setHeader('POST', query)).then((response)  => response.json());
}

function updateQuery(queryId, query) {
  return fetch(`${SERVER_URL}/query/${queryId}`, setHeader('PUT', query, true)).then((response) => response.json());
}

function getAllQueries() {
  return fetch(`${SERVER_URL}/query/list/all`, setHeader('GET', null, true)).then((response) => response.json());
}