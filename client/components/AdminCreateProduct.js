import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store/singleProduct";
const ooName = "Orange Ostriches SpaceCo";

const AdminCreateProduct = () => {
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    price: 0,
    fuelType: "plutonium",
    size: "small",
    range: 0,
    specialty: "exploration",
    topSpeed: 0,
    autopilot: true,
    description: "This spaceship needs a description",
    image: "",
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
      `This will permanently create this item in ${ooName}'s database! Are you sure you wish to proceed?`
    );
    const redirect = () => {
      window.location = `/admin-products`;
    };

    if (confirmation) {
      dispatch(createProduct(state));
      alert(`${state.name} has been added to the database.`);
      redirect();
    }
  };

  return (
    <div>
      <Link to={`/admin-products`}>
        <button>Cancel Creating</button>
      </Link>
      <h3>Creating New Product:</h3>
      <form id="create-product" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name: </label>
        <input
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Enter product name here"
        />
        <br />

        <label htmlFor="image">Product Image: </label>
        <input
          name="image"
          value={state.image}
          onChange={handleChange}
          placeholder="Enter url to product image here"
        />
        <br />

        <label htmlFor="price">Product Price: </label>
        <input
          name="price"
          value={state.price}
          onChange={handleChange}
          placeholder="Enter product price here"
        />
        <br />

        <label htmlFor="description">Product Description: </label>
        <input
          name="description"
          value={state.description}
          onChange={handleChange}
          placeholder="Enter product description here"
        />
        <br />

        <label htmlFor="size">Product Size: </label>
        <select name="size" onChange={handleChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <br />

        <label htmlFor="fuelType">Product Fuel Type: </label>
        <select name="fuelType" onChange={handleChange}>
          <option value="plutonium">Plutonium</option>
          <option value="uranium">Uranium</option>
          <option value="hydrogen">Hydrogen</option>
        </select>
        <br />

        <label htmlFor="range">Product Range (in ly): </label>
        <input
          name="range"
          value={state.range}
          onChange={handleChange}
          placeholder="Enter the product's range"
        />
        <br />

        <label htmlFor="specialty">Product Specialty: </label>
        <select name="specialty" onChange={handleChange}>
          <option value="exploration">Exploration</option>
          <option value="mining">Mining</option>
          <option value="combat">Combat</option>
          <option value="transportation">Transportation</option>
        </select>
        <br />

        <label htmlFor="topSpeed">Product Top Speed (in ly/h): </label>
        <input
          name="topSpeed"
          value={state.topSpeed}
          onChange={handleChange}
          placeholder="Enter the product's top speed"
        />
        <br />

        <label htmlFor="autopilot">Product Autopilot: </label>
        <select name="autopilot" onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br />
        <button type="submit">Submit Product Changes</button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
