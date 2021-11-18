import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateProduct } from "../store/singleProduct";
const ooName = "Orange Ostriches SpaceCo";

const AdminEditProduct = () => {
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    ...product,
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let confirmation = confirm(
      `This will permanently alter this item in ${ooName}'s database! Are you sure you wish to proceed?`
    );
    const redirect = () => {
      window.location = `/products/${product.id}`;
    };

    if (confirmation) {
      console.log(product);
      dispatch(updateProduct(state));
      alert(`${product.name} has been changed in the database.`);
      // redirect();
    }
  };

  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <button>Cancel Editing</button>
      </Link>
      <h3>Editing {product.name}:</h3>
      <form id="edit-product" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name: </label>
        <input
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder={state.name}
        />
        <br />

        <label htmlFor="image">Product Image: </label>
        <input
          name="image"
          value={state.image}
          onChange={handleChange}
          placeholder={state.image}
        />
        <br />

        <label htmlFor="price">Product Price: </label>
        <input
          name="price"
          value={state.price}
          onChange={handleChange}
          placeholder={state.price}
        />
        <br />

        <label htmlFor="description">Product Description: </label>
        <input
          name="description"
          value={state.description}
          onChange={handleChange}
          placeholder={state.description}
        />
        <br />

        <label htmlFor="size">Product Size: </label>
        <select name="size" onChange={handleChange} placeholder={state.size}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <br />

        <label htmlFor="fuelType">Product Fuel Type: </label>
        <select
          name="fuelType"
          onChange={handleChange}
          placeholder={state.fuelType}
        >
          <option value="Plutonium">Plutonium</option>
          <option value="Uranium">Uranium</option>
          <option value="Hydrogen">Hydrogen</option>
        </select>
        <br />

        <label htmlFor="range">Product Range (in ly): </label>
        <input
          name="range"
          value={state.range}
          onChange={handleChange}
          placeholder={state.range}
        />
        <br />

        <label htmlFor="specialty">Product Specialty: </label>
        <select
          name="specialty"
          onChange={handleChange}
          placeholder={state.specialty}
        >
          <option value="Combat">Combat</option>
          <option value="Exploration">Exploration</option>
          <option value="Mining">Mining</option>
          <option value="Transportation">Transportation</option>
        </select>
        <br />

        <label htmlFor="topSpeed">Product Top Speed (in ly/h): </label>
        <input
          name="topSpeed"
          value={state.topSpeed}
          onChange={handleChange}
          placeholder={state.topSpeed}
        />
        <br />

        <label htmlFor="autopilot">Product Autopilot: </label>
        <select
          name="autopilot"
          onChange={handleChange}
          placeholder={state.autopilot ? "Yes" : "No"}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br />
        <button type="submit">Submit Product Changes</button>
      </form>
      <hr />
      <div className="editor-current-product">
        <h5>Current Product:</h5>
        <div className="single-product-container">
          <div className="single-product-image">
            <img width="400px" src={product.image} alt={product.name} />
          </div>
          <div className="single-product-info">
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <h4>Description: {product.description}</h4>
            <h4>Size: {product.size}</h4>
            <h4>Fuel Type: {product.fuelType}</h4>
            <h4>Range: {product.range} ly</h4>
            <h4>Specialty: {product.specialty}</h4>
            <h4>Top Speed: {product.topSpeed} ly/h</h4>
            <h4>Autopilot: {product.autopilot ? "Yes" : "No"}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
