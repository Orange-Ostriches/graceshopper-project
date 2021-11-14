import React from 'react'
import { connect } from 'react-redux'
import { removeItemFromCart } from "../store/cart"

class CartItem extends React.Component {

  render() {
    const { item } = this.props;
    return (
      <>
        <li className="item-name">
          <p>{item.name}</p>
        </li>
        <li className="item-qty">
          <p>Quantity: {item.qty}</p>
        </li>
        <li className="item-price">
          <p>Price: ${item.price}</p>
        </li>
        <li className="item-total">
          <p>Total: ${item.price * item.qty}</p>
        </li>
        <button className="remove-item" onClick={ () => this.props.removeItem(item, this.props.isLoggedIn) }>Remove</button>
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
    removeItem: (item) => {
      dispatch(removeItemFromCart(item))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
