import { useCallback, useEffect, useState } from 'react';
import ProductTile from './ProductTile';

const urlToFetch = 'https://swapi.dev/api/vehicles';

export const RelatedProducts = ({ product }) => {
  const searchTerm = product.name.charAt(0);
  const [busy, setBusy] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const fetchRelatedProducts = useCallback(() => {
    setBusy(true);
    return fetch(`${urlToFetch}/?search=${searchTerm}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const relatedProducts = data.results;
        if (relatedProducts) {
          setRelatedProducts(relatedProducts.slice(0, 4));
        }
        setBusy(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);
  return (
    <div className="row mt-4">
      <div className="col-12 mb-6">
        {busy ? (
          <h2>Loading Related Products...</h2>
        ) : (
          <h2>Related Products:</h2>
        )}
      </div>

      {relatedProducts.map((product) => {
        const { name } = product;
        return <ProductTile product={product} key={name}></ProductTile>;
      })}
    </div>
  );
};

export default RelatedProducts;
