import { AppContext } from '../contexts/AppContext';
import Discount from './Discount';
import { useContext } from 'react';

export const CartTotals = ({ cart }) => {
  const { dispatch, state } = useContext(AppContext);
  const { discount, promoCode } = state;
  const renderTableRows = () => {
    if (cart.length === 0) {
      return <h2>No products in cart</h2>;
    }

    return cart.map((cartItem) => {
      const { name, cost_in_credits } = cartItem;

      const removeFromCart = () => {
        dispatch({
          type: 'removeFromCart',
          payload: cartItem,
        });
      };

      const navigateToPdp = () => {
        dispatch({
          type: 'setSelected',
          payload: cartItem,
        });

        dispatch({
          type: 'setScreen',
          payload: 'productPage',
        });
      };

      return (
        <tr key={name}>
          <td onClick={navigateToPdp}>{name}</td>
          <td onClick={navigateToPdp}>{cost_in_credits}</td>
          <td>
            <button
              className="btn btn-warning btn-xl flex-grow-1"
              title={`Remove from cart`}
              type="button"
              onClick={removeFromCart}
            >
              Remove from cart
            </button>
          </td>
        </tr>
      );
    });
  };

  const removeDiscount = () => {
    dispatch({
      type: 'removeDiscount',
    });
    dispatch({
      type: 'removePromoCode',
    });
  };

  const renderTotalsRow = () => {
    const total = cart.reduce((total, { cost_in_credits: price }) => {
      // price = cartItem.cost_in_credits
      return (total += Number(price));
    }, 0);
    return (
      <>
        <tr>
          <td>Total</td>
          <td>{total - total * discount}</td>
        </tr>
        {promoCode ? (
          <tr>
            <td>Discount</td>
            <td>{total * discount}</td>
            <td>
              <button
                className="btn btn-warning btn-xl flex-grow-1"
                title={`Remove discount`}
                type="button"
                onClick={removeDiscount}
              >
                Remove discount
              </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td>No Discount Added</td>
          </tr>
        )}
      </>
    );
  };

  return (
    <>
      <table className="table table-dark">
        <tbody>
          {renderTableRows()}
          {renderTotalsRow()}
        </tbody>
      </table>
      {promoCode ? '10% discount applied' : <Discount />}
    </>
  );
};

export default CartTotals;
