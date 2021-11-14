import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AdminProductList = () => {
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

  return (
    <div id="admin-product-list">
      <Link to="/admin-products/create">
        <button>Create New Product</button>
      </Link>
      <h1>Product List</h1>
      <div id="admin-products">
        {products.map((product) => (
          <div key={product.id} id="product">
            {product.name}
            <br />
            <Link to={`/products/${product.id}`}>
              <button>View Product Page</button>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/admin-portal">
        <button>Back to Administrator Portal</button>
      </Link>
    </div>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(AdminProductList);
