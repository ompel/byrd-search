import { DATE_RANGE_SELECTION, USER_SELECTION, SET_USERS } from "../actionTypes";

const initialState = {
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  },
  selectedUser: {},
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATE_RANGE_SELECTION:
      return {
        ...state,
        dateRange: action.dateRange
      };

    case USER_SELECTION:
      return {
        ...state,
        selectedUser: action.selectedUser
      };

      case SET_USERS:
      return {
        ...state,
        users: action.users
      };

    default:
      return { ...state };
  }
};
