import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';

/**
 * COMPONENT
 */
export const Home = () => {

  const { auth: {username}, products } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      dispatch(fetchProducts());
    };
    run();
  }, [])

  console.log('USER', username);
  console.log('PRODUCTS', products);
  return (
    <div>
      <h3>Welcome, {username !== undefined ? username : "Guest"}!</h3>
      <h2 id="carousel-title">Featured Products</h2>
      <div id="carousel">
        {products.map(product => (
          <div key={product.id} id="product">
            <img width="400px" src={product.image} />
            <h1>{product.name}</h1>
            <h3>Price: {product.price}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
