import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminProductRow from "./AdminProductRow";

const AdminProductList = () => {
  const { auth } = useSelector((state) => state);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data: products } = await axios.get("/api/spaceships/", {
        headers: {
          Authorization: window.localStorage.token,
        },
      });
      setProducts(products);
    };
    getProducts();
  }, []);

  if (auth.isAdmin === true) {
    return (
      <div id="admin-product-list" className="content">
        <h1>Product List</h1>
        <Link to="/admin-products/create">
          <button>Create New Product</button>
        </Link>
        <table id="admin-products">
          <tbody>
            <tr id="columns">
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Fuel Type</th>
              <th>Size</th>
              <th>Range</th>
              <th>Specialty</th>
              <th>Top Speed</th>
              <th>Autopilot</th>
              <th>Description</th>
              <th>Image URL</th>
            </tr>
            {products.map((product) => {
              return <AdminProductRow key={product.id} product={product}/>
            })
            }
          </tbody>
        </table>
        <Link to="/admin-portal">
          <button>Back to Administrator Portal</button>
        </Link>
      </div>
    );
  } else {
    <div className="content">
      <h3>You are not authorized to access this content.</h3>
      <Link to="/">
        <button>Return to the home page</button>
      </Link>
    </div>;
  }
};

export default AdminProductList;
