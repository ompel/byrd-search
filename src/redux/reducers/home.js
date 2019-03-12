import { DATE_RANGE_SELECTION, CUSTOMER_SELECTION, SET_CUSTOMERS } from "../actionTypes";

const initialState = {
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  },
  selectedCustomer: {},
  customers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATE_RANGE_SELECTION:
      return {
        ...state,
        dateRange: action.dateRange
      };

    case CUSTOMER_SELECTION:
      return {
        ...state,
        selectedCustomer: action.selectedCustomer
      };

      case SET_CUSTOMERS:
      return {
        ...state,
        customers: action.customers
      };

    default:
      return { ...state };
  }
};
