import { SET_ORDERS_FOR_USER } from "../actionTypes";

const initialState = {
  ordersForUser: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS_FOR_USER:
    return {
      ...state,
      ordersForUser: action.ordersForUser
    }

    default:
      return { ...state };
  }
};
