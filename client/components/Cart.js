import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { setCart, clearCart, userGetCart } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.isLoggedIn
      ? this.props.userGetCart(localStorage.token)
      : this.props.setCart();
  }

  handleCheckout() {
    this.props.clearCart(this.props.cart, this.props.isLoggedIn);
  }

  render() {
    const cartItems = this.props.cart.cartItems || [];
    let cartTotalPrice = 0;
    const listOfItems = cartItems.map((item) => {
      return (
        <div className="list-of-items">
          <CartItem item={item} key={item.id} />
        </div>
      );
    });

    if (cartItems.length > 0) {
      const pricesArray = cartItems.map((item) => {
        return item.price * item.itemQty;
      });
      cartTotalPrice = pricesArray.reduce((a, b) => a + b);
    }

    return (
      <div className="content">
        <div className="cart">
          <h1>Items in Cart</h1>

          <div className="cart-item">
            <ul className="cart-item-list">{listOfItems}</ul>
          </div>
          <div>
            <p>Cart Total Price: ${cartTotalPrice}</p>
          </div>

          {listOfItems.length === 0 ? (
            <Link to={`/`}>
              <button className="cart-continue">Continue Shopping</button>
            </Link>
          ) : (
            <>
              <Link to="/checkout">
                <button onClick={this.handleCheckout} className="cart-checkout">
                  Checkout Cart
                </button>
              </Link>
              <Link to={`/`}>
                <button className="cart-continue">Continue Shopping</button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (isLoggedIn) => dispatch(setCart(isLoggedIn)),
    clearCart: (isLoggedIn, cart) => dispatch(clearCart(isLoggedIn, cart)),
    userGetCart: (credential) => dispatch(userGetCart(credential)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
