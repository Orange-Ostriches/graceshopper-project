import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { setCart, clearCart } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleCheckout() {
    this.props.clearCart();
  }

  render() {
    const listOfItems = this.props.cart.cartItems.map((item) => {
      return (
        <div className="list-of-items">
          <CartItem item={item} key={item.id} />
        </div>
      );
    });

    return (
      <div className="content">
        <h1>Items in Cart</h1>

        <div className="cart-item">
          <ul className="cart-item-list">{listOfItems}</ul>
        </div>

        {listOfItems.length === 0 ? (
          <Link to={`/`}>
            <button>Continue Shopping</button>
          </Link>
        ) : (
          <>
            <Link to="/checkout">
              <button onClick={this.handleCheckout}>Checkout Cart</button>
            </Link>
            <Link to={`/`}>
              <button>Continue Shopping</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(setCart(cart)),
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
