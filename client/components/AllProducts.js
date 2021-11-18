import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

export const AllProducts = () => {
  const { products } = useSelector((state) => state);
  const [priceFilter, setPriceFilter] = useState(0);
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [rangeFilter, setRangeFilter] = useState(0);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [topSpeedFilter, setTopSpeedFilter] = useState(0);
  const [autopilotFilter, setAutopilotFilter] = useState(2);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const clearFilter = () => {
    setPriceFilter(0);
    setFuelTypeFilter("all");
    setSizeFilter("all");
    setRangeFilter(0);
    setSpecialtyFilter("all");
    setTopSpeedFilter(0);
    setAutopilotFilter(2);
  };

  const filteredProducts = products
    .filter((product) => {
      const priceRanges = { 499: 100, 1000: 500 };
      if (priceFilter === 0) return product;
      if (
        product.price <= priceFilter &&
        product.price >= priceRanges[priceFilter]
      ) {
        return product;
      }
    })
    .filter((product) => {
      if (fuelTypeFilter === "all") return product;
      return product.fuelType === fuelTypeFilter;
    })
    .filter((product) => {
      if (sizeFilter === "all") return product;
      return product.size === sizeFilter;
    })
    .filter((product) => {
      const rangeRanges = {
        499: 100,
        999: 500,
        1499: 1000,
        1999: 1500,
        2500: 2000,
      };
      if (rangeFilter === 0) return product;
      if (
        product.range <= rangeFilter &&
        product.range >= rangeRanges[rangeFilter]
      ) {
        return product;
      }
    })
    .filter((product) => {
      if (specialtyFilter === "all") return product;
      return product.specialty === specialtyFilter;
    })
    .filter((product) => {
      const topSpeedRanges = { 249: 100, 500: 250 };
      if (topSpeedFilter === 0) return product;
      if (
        product.topSpeed <= topSpeedFilter &&
        product.topSpeed >= topSpeedRanges[topSpeedFilter]
      ) {
        return product;
      }
    })
    .filter((product) => {
      if (autopilotFilter === 2) return product;
      if (product.autopilot && autopilotFilter === 1) return product;
      if (!product.autopilot && autopilotFilter === 0) return product;
    });

  return (
    <div className="content">
      <div id="filters">
        <h3>Filter by:</h3>
        <form className="form-box">
          <div className="filter">
            <label htmlFor="price">Price</label>
            <select
              name="price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(parseInt(e.target.value))}
              className="form-select"
            >
              <option value={0}>All</option>
              <option value={499}>100 - 499</option>
              <option value={1000}>500 - 1,000</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              name="fuelType"
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="Plutonium">Plutonium</option>
              <option value="Uranium">Uranium</option>
              <option value="Hydrogen">Hydrogen</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="size">Size</label>
            <select
              name="size"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="range">Range</label>
            <select
              name="range"
              value={rangeFilter}
              onChange={(e) => setRangeFilter(parseInt(e.target.value))}
              className="form-select"
            >
              <option value={0}>All</option>
              <option value={499}>100 - 499</option>
              <option value={999}>500 - 999</option>
              <option value={1499}>1,000 - 1,499</option>
              <option value={1999}>1,500 - 1,999</option>
              <option value={2500}>2,000 - 2,500</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="specialty">Specialty</label>
            <select
              name="specialty"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="Combat">Combat</option>
              <option value="Exploration">Exploration</option>
              <option value="Mining">Mining</option>
              <option value="Transportation">Transportation</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="topSpeed">Top Speed</label>
            <select
              name="topSpeed"
              value={topSpeedFilter}
              onChange={(e) => setTopSpeedFilter(parseInt(e.target.value))}
              className="form-select"
            >
              <option value={0}>All</option>
              <option value={249}>100 - 249</option>
              <option value={500}>250 - 500</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="autopilot">Autopilot</label>
            <select
              name="autopilot"
              value={autopilotFilter}
              onChange={(e) => setAutopilotFilter(parseInt(e.target.value))}
              className="form-select"
            >
              <option value={2}>All</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="filter">
            <button
              value="clear"
              type="button"
              onClick={() => clearFilter()}
              className="filter-button"
            >
              Clear Filter
            </button>
          </div>
        </form>
      </div>
      {products.length < 1 ? (
        <h1 className="title">Loading...</h1>
      ) : (
        <div id="all-products" className="product-card-wrapper">
          <div id="products" className="product-card">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  id="product"
                  className="product-card-body"
                >
                  <img className="product-card-image" src={product.image} />
                  <h1 className="product-card-name">{product.name}</h1>
                  <h3 className="product-card-price">Price: {product.price}</h3>
                  <p id="desc" className="product-card-text">
                    Description: {product.description}
                  </p>
                  <Link to={`/products/${product.id}`}>
                    <button className="product-card-button">
                      Full Details
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <h3>
                Please contact OrangeOstriches SpaceCo to inquire about a custom
                spaceship!
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
