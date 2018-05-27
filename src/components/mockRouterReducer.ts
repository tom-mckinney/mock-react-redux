import { Reducer } from "redux";
import { LOCATION_CHANGE, RouterState } from "react-router-redux";

const initialState = {
  location: null,
  action: null
};

const mockRouterReducer: Reducer = (state: RouterState = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mockRouterReducer;
