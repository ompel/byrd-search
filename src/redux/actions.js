import {
  DATE_RANGE_SELECTION,
  USER_SELECTION,
  SET_USERS,
  SET_ORDERS_FOR_USER
} from './actionTypes';


// Home related actions
export const dateRangeSelection = dateRange => ({
  type: DATE_RANGE_SELECTION,
  dateRange
});

export const userSelection = selectedUser => ({
  type: USER_SELECTION,
  selectedUser
});

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const setOrdersForUser = ordersForUser => ({
  type: SET_ORDERS_FOR_USER,
  ordersForUser
})