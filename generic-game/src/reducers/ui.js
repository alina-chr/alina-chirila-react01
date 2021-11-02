import { CLICKER_CLICK, CLICKER_DECREMENT } from '../actions/types/ui';

const initalState = {
  clicker: 0,
};

export const uiReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case CLICKER_CLICK:
      const newState = {};
      newState.clicker = state.clicker + payload;
      return newState;
    // return {
    // clicker: state.clicker + payload, //overide
    // };

    case CLICKER_DECREMENT:
      return {
        ...state,
        clicker: state.clicker - payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
