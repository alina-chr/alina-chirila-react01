import {
  CLICKER_CLICK,
  CLICKER_DECREMENT,
  SET_NETWORK_ERROR,
} from '../../types/ui';

export const clickClicker = (payload = 1) => {
  return {
    type: CLICKER_CLICK,
    payload,
  };
};

export const decrementClicker = (payload = 1) => {
  return {
    type: CLICKER_DECREMENT,
    payload,
  };
};

export const setNetworkError = (payload = 'A Network Error has occurred') => {
  return {
    type: SET_NETWORK_ERROR,
    payload: payload,
  };
};
