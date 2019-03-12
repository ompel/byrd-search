import {
  DATE_RANGE_SELECTION,
  CUSTOMER_SELECTION,
  SET_CUSTOMERS,
  SET_ORDERS_FOR_CUSTOMER
} from './actionTypes';

export const dateRangeSelection = dateRange => ({
  type: DATE_RANGE_SELECTION,
  dateRange
});

export const customerSelection = selectedCustomer => ({
  type: CUSTOMER_SELECTION,
  selectedCustomer
});

export const setCustomers = customers => ({
  type: SET_CUSTOMERS,
  customers
})

export const setOrdersForCustomer = ordersForCustomer => ({
  type: SET_ORDERS_FOR_CUSTOMER,
  ordersForCustomer
})