import { SET_ORDERS_FOR_CUSTOMER } from "../actionTypes";

const initialState = {
  ordersForCustomer: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS_FOR_CUSTOMER:
    return {
      ...state,
      ordersForCustomer: action.ordersForCustomer
    }

    default:
      return { ...state };
  }
};
