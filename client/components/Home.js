import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeatProducts } from '../store/products';

/**
 * COMPONENT
 */
export const Home = () => {

  const { auth: {username}, products } = useSelector(state => state);
  const [mainProduct, setMainProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeatProducts())
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      setMainProduct(products[0]);
    }
  }, [products])

  return (
    <div>
      <h3>Welcome, {username !== undefined ? username : "Guest"}!</h3>
      {
        Object.keys(mainProduct).length === 0 ? (
          <h1 className="carousel-title">Loading...</h1>
          ) : (
          <div className="main">
            <h1 className="carousel-title">Featured Products</h1>
            <div id="carousel-main">
              <img id="main-prod-img" src={mainProduct.image} />
              <h2 id="main-prod-title">{mainProduct.name}</h2>
            </div>
            <div id="carousel">
              {products.map(product => (
                <div key={product.id} id="product">
                  <img
                    className="prod-img"
                    src={product.image}
                    onClick={() => setMainProduct(product)}
                  />
                  <h3>{product.name}</h3>
                  <h4>Price: {product.price}</h4>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}
