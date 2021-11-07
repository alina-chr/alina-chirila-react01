import { useContext, useMemo } from 'react';
import { AppContext } from './../contexts/AppContext';

export const ProductTile = ({ product }) => {
  const { name, model } = product;
  const { dispatch, state } = useContext(AppContext);
  const { cart } = state;
  const navigateToPdp = () => {
    dispatch({
      type: 'setScreen',
      payload: 'productPage',
    });

    dispatch({
      type: 'setSelected',
      payload: product,
    });
  };

  const productInCart = useMemo(() => {
    return Boolean(
      cart.find((cartItem) => {
        return cartItem.name === product.name;
      }),
    );
  }, [cart, product.name]);

  return (
    <article className="col-6 col-md-3 mb-6 d-flex flex-column">
      <header className="flex-grow-1 text-center mb-4">
        <h5 className="text-warning text-left">{name}</h5>
        <h6>({model})</h6>

        {/* <MetaImage term={name}></MetaImage> */}
      </header>

      <section className="mt-2 text-center">
        <button
          className="btn btn-warning"
          title={`Details for ${name}`}
          type="button"
          onClick={navigateToPdp}
        >
          Details
        </button>
        <span>
          <i
            className="fas fa-shopping-cart m-3"
            style={{ color: productInCart ? 'white' : 'grey' }}
          ></i>
        </span>
      </section>
    </article>
  );
};

export default ProductTile;
