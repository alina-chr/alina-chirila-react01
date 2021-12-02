import {
  CLICKER_CLICK,
  CLICKER_DECREMENT,
  SET_NETWORK_ERROR,
} from '../actions/types/ui';

const initialState = {
  clicker: 0,
  networkError: '',
};

export const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLICKER_CLICK:
      const newState = {};

      newState.clicker = state.clicker + payload;
      return newState;
    case CLICKER_DECREMENT:
      return {
        ...state,
        clicker: state.clicker - payload,
      };
    case SET_NETWORK_ERROR:
      return {
        ...state,
        networkError: payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
