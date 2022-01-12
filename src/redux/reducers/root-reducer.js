import { combineReducers } from 'redux';

import filters from './filters/filters';
import pizzas from './pizzas/pizzas';
import cart from './cart/cart';

const rootReducer = combineReducers({
  filters,
  pizzas,
  cart,
})

export default rootReducer;