import { combineReducers } from 'redux';
import home from './home';
import orders from './orders'

export default combineReducers({
    home,
    orders
  });
