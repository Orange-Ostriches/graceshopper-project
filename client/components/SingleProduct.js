import React from "react";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/product";
import { deleteProduct } from "../store/products";
import { connect } from "react-redux";
const ooName = "Orange Ostriches SpaceCo";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
    } catch (error) {
      console.error(error);
    }
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

  render() {
    const { product, isAdmin } = this.props;
    return (
      <div>
        <div className="back-to-home">
          {isAdmin ? (
            <Link to="/admin-products">Back to Admin Product Portal</Link>
          ) : (
            <Link to="/products">Back to All Spaceships</Link>
          )}
        </div>
        <div className="single-product-container">
          <div className="single-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="single-product-info">
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <p>Description: {product.description}</p>
            <p>
              Size:
              <select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </p>
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
              <button className="add-to-cart">Add To Cart</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    isAdmin: state.auth.isAdmin,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, dispatchToProps)(SingleProduct);
