import React from 'react'
import { connect } from 'react-redux'
import { decrementItemFromCart, deleteFromCart, incrementItemFromCart } from "../store/cart"

class CartItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <>
        <li className="item-name">
          <p>{item.name}</p>
        </li>
        <li className="item-qty">
          <p>Quantity: {item.itemQty}</p>
        </li>
        <li className="item-price">
          <p>Price: ${item.price}</p>
        </li>
        <li className="item-total">
          <p>Total: ${item.price * item.itemQty}</p>
        </li>

        <button
        className="decrement-item"
        onClick={ () => this.props.decrementItem(item, this.props.isLoggedIn)
        }>
        -
        </button>

        <button
        className="increment-item"
        onClick={() => this.props.incrementItem(item, this.props.isLoggedIn)}
        >
        +
        </button>

        <button
        className="remove-item"
        onClick={() => this.props.removeItem(item, this.props.isLoggedIn, this.props.userId)}
        >
        Remove From Cart
        </button>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    decrementItem: (item, isLoggedIn) => {
      dispatch(decrementItemFromCart(item, isLoggedIn))
    },
    removeItem: (item, isLoggedIn) => {
      dispatch(deleteFromCart(item, isLoggedIn))
    },
    incrementItem: (item, isLoggedIn) => {
      dispatch(incrementItemFromCart(item, isLoggedIn))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
