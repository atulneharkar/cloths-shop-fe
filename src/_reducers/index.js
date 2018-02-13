import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { authentication } from './authentication.reducer';
import { user } from './user.reducer';
import { order } from './order.reducer';
import { product } from './product.reducer';
import { category } from './category.reducer';
import { contactUs } from './contact-us.reducer';

const rootReducer = combineReducers({
	form,
  authentication,
  user,
  order,
  product,
  category,
  contactUs
});

export default rootReducer;