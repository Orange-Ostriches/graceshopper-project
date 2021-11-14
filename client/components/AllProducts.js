import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';

export const AllProducts = () => {

  const { products } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  console.log(products)

  return (
    <div>
      {
        products.length < 6 ? (
          <h1 className="title">Loading...</h1>
        ) : (
        <div id="all-products">
          <div id="products">
            {products.map(product => (
              <div key={product.id} id="product">
                <Link to={`/products/${product.id}`}>
                  <img className="prod-img" src={product.image} />
                </Link>
                <h1>{product.name}</h1>
                <h3>Price: {product.price}</h3>
                <h4>Fuel Type: {product.fuelType}</h4>
                <h4>Size: {product.size}</h4>
                <h4>Range: {product.range}</h4>
                <h4>Specialty: {product.specialty}</h4>
                <h4>Top Speed: {product.topSpeed} lyph</h4>
                <h4>Autopilot? {product.autopilot ? "Yes" : "No"}</h4>
                <p id="desc">Description: {product.description}</p>
              </div>
            ))}
          </div>
        </div>
        )
      }

    </div>
  )
}
