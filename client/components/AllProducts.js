import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';

const AllProducts = () => {

  const { products } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      dispatch(fetchProducts());
    };
    run();
  }, [])

  return (
    <div id="all-products">
        <div id="products">
          {products.map(product => (
            <div key={product.id} id="product">
              <img width="200px" src={product.image} />
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
              <h4>{product.fuelType}</h4>
              <h4>{product.size}</h4>
              <h4>{product.range}</h4>
              <h4>{product.specialty}</h4>
              <h4>{product.topSpeed} lyph</h4>
              <h4>{product.autopilot}</h4>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default AllProducts;

/**
class AllProducts extends Component {

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log(this.props);
    return (
      <div id="all-products">
        <div id="products">
          {this.props.products.map(product => (
            <div key={product.id} id="product">
              <img width="200px" src={product.image} />
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
              <h4>{product.fuelType}</h4>
              <h4>{product.size}</h4>
              <h4>{product.range}</h4>
              <h4>{product.specialty}</h4>
              <h4>{product.topSpeed} lyph</h4>
              <h4>{product.autopilot}</h4>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const mSTP = state => {
  return {
    products: state.products
  }
};

const mDTP = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
};

export default connect(mSTP, mDTP)(AllProducts);

*/

