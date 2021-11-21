import { createContext } from 'react';

export const AppContext = createContext();

export const appState = {
  currentScreen: 'home',
  selected: null,
  searchResults: [],
  promoCode: false,
  discount: 0,
  cart: [],
  order: {
    address: {},
    items: [],
  },
};

export const appStateReducer = (appState, { type, payload }) => {
  if (type === 'setScreen') {
    // payload commits to being something like 'home' 'products' etc...
    return {
      ...appState,
      currentScreen: payload,
    };
  }

  if (type === 'setSelected') {
    return {
      ...appState,
      selected: payload,
    };
  }

  if (type === 'setSearchResults') {
    return {
      ...appState,
      searchResults: payload,
    };
  }

  if (type === 'addToCart') {
    return {
      ...appState,
      cart: [...appState.cart, payload],
    };
  }

  if (type === 'removeFromCart') {
    const cart = appState.cart.filter((cartItem) => {
      return cartItem.name !== payload.name;
    });

    return {
      ...appState,
      cart,
    };
  }

  if (type === 'emptyCart') {
    return {
      ...appState,
      cart: [],
    };
  }

  if (type === 'applyPromoCode') {
    const promos = { APPLY10: 0.1, 'LUNA DECEMBRIE': 0.5 };
    if (promos[payload] === undefined) {
      return {
        ...appState,
        promoCode: false,
        promoType: 'invalid',
        discount: 0,
      };
    }

    return {
      ...appState,
      promoCode: true,
      promoType: payload,
      discount: promos[payload],
    };
  }

  if (type === 'removePromoCode') {
    return {
      ...appState,
      promoCode: false,
      discount: 0,
    };
  }

  if (type === 'setOrder') {
    return {
      ...appState,
      order: payload,
    };
  }

  return appState;
};
