import { AppContext } from '../contexts/AppContext';
import { useContext, useState } from 'react';

export const Discount = () => {
  const { dispatch, state } = useContext(AppContext);
  const { promoCode } = state;
  const [entry, setEntry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (event) => {
    setEntry(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'applyPromoCode',
      payload: entry,
    });

    setEntry('');
    if (!promoCode) {
      setErrorMessage('Invalid promo code. ');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="row mb-3">
        <div className="col-12">
          <div className="form-check">
            <input
              className="me-2"
              type="text"
              name="discount"
              placeholder="PROMO CODE"
              onChange={onInputChange}
              value={entry}
            ></input>
            <label
              htmlFor="terms"
              className="form-check-label btn p-0 text-white"
            >
              {errorMessage}
              Enter "APPLY10" for 10% discount
            </label>

            <button
              className="btn btn-outline-warning ms-2 mt-2"
              type="submit"
              title="Apply Discount"
            >
              Apply Promo
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Discount;
