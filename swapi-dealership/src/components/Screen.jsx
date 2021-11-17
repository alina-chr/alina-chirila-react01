import Products from './Products';
import Product from './Product';
import SearchResults from './SearchResults';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import Error404 from './Error404';

const componentMap = {
  home: Products,
  productPage: Product,
  searchResults: SearchResults,
  cart: Cart,
  checkout: Checkout,
  orderConfirmation: OrderConfirmation,
  error404Page: Error404,
};

// props = {screen: 'home'}
// props.screen
// props->screen
export const Screen = ({ screen = '' }) => {
  if (!screen || typeof componentMap[screen] === 'undefined') {
    return <componentMap.error404></componentMap.error404>;
  }

  const CurrentComponent = componentMap[screen];

  return <CurrentComponent></CurrentComponent>;
};

export default Screen;
