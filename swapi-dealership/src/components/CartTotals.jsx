import { useContext, useState, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';

export const CartTotals = ({ cart }) => {
  const { dispatch } = useContext(AppContext);
  const [cartDiscount, setCartDiscount] = useState(false);
  const inputRef = useRef();

  const toggleDiscount = () => {
    if (!cartDiscount) {
      setCartDiscount(true);
      inputRef.current.checked = true;
    } else {
      setCartDiscount(false);
      inputRef.current.checked = false;
    }
  };
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

  const renderTotalsRow = () => {
    const total = cart.reduce((total, { cost_in_credits: price }) => {
      let cartTotal = (total += Number(price));
      let discount = cartTotal * 0.1;
      if (cartDiscount) {
        return cartTotal - discount;
      } else {
        return cartTotal;
      }
      // price = cartItem.cost_in_credits
    }, 0);

    return (
      <>
        <tr>
          <td>Total</td>
          <td>{total}</td>
        </tr>
        {cartDiscount ? (
          <tr>
            <td> Discount: </td>
            <td>{total * 0.1} </td>
            <td>
              <button
                className="btn btn-warning btn-xl flex-grow-1"
                title={`Remove from cart`}
                type="button"
                onClick={toggleDiscount}
              >
                {!cartDiscount ? 'add discount' : 'remove discount'}
              </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td>No discount applied</td>
          </tr>
        )}
      </>
    );
  };

  const renderDiscountRow = () => {
    return (
      <form>
        <div className="row mb-3">
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="discount"
                id="discount"
                ref={inputRef}
                onChange={toggleDiscount}
              ></input>
              <label
                htmlFor="terms"
                className="form-check-label btn p-0 text-white"
              >
                Apply 10% discount
              </label>
            </div>
          </div>
        </div>
      </form>
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
      {renderDiscountRow()}
    </>
  );
};

export default CartTotals;
