import React from "react";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/products";
import { connect } from "react-redux";
import { addItemToCart } from "../store/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ooName = "Orange Ostriches SpaceCo";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }

  handleDelete(event) {
    let confirmation = confirm(
      `This will permanently delete this item from ${ooName}'s database! Are you sure you wish to proceed?`
    );
    const redirect = () => {
      window.location = `/products/${this.props.product.id}`;
    };

    if (confirmation) {
      this.props.deleteProduct(parseInt(event.target.id));
      alert(`${this.props.product.name} has been removed from the database.`);
    } else {
      redirect();
    }
  }

  handleClick() {
    this.props.itemToCart(this.props.product, this.props.isLoggedIn);
  }

  render() {
    const { product, isAdmin } = this.props;
    return (
      <div className="content">
        <div className="single-product-container">
          <div className="single-product-info">
            <img width="400px" src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <h3>
              Price: {product.price}{" "}
              <FontAwesomeIcon
                icon={["fad", "rupee-sign"]}
                className="rupee-sign"
              />
            </h3>
            <h4>Fuel Type: {product.fuelType}</h4>
            <h4>Size: {product.size}</h4>
            <h4>Range: {product.range}</h4>
            <h4>Specialty: {product.specialty}</h4>
            <h4>Top Speed: {product.topSpeed} lyph</h4>
            <h4>Autopilot? {product.autopilot ? "Yes" : "No"}</h4>
            <p id="desc">Description: {product.description}</p>
            {isAdmin ? (
              <div>
                <Link to={`/products/${product.id}/edit`}>
                  <button>Edit This Product</button>
                </Link>
                <br />
                <Link to="/admin-products">
                  <button onClick={this.handleDelete} id={product.id}>
                    Delete This Product
                  </button>
                </Link>
              </div>
            ) : (
              <button
                className="product-card-button"
                onClick={this.handleClick}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
        <div className="back-to-products">
          {isAdmin ? (
            <Link to="/admin-products" className="back-text">
              <FontAwesomeIcon
                icon={["fad", "backward"]}
                className="back-arrow"
              />
              <span>Back to Admin Product Portal</span>
            </Link>
          ) : (
            <Link to="/products" className="back-text">
              <FontAwesomeIcon
                icon={["fad", "backward"]}
                className="back-arrow"
              />
              <span>Back to All Products</span>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    itemToCart: (item) => dispatch(addItemToCart(item)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, dispatchToProps)(SingleProduct);
