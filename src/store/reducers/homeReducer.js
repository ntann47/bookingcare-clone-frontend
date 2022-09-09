import actionTypes from "../actions/actionTypes";

const initialState = {
  topDoctors: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTORS_HOME_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_HOME_FAIL:
      state.topDoctors = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default homeReducer;
