import React from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import { removeItemFromCart } from "../store/cart"

class Cart extends React.Component {
  render() {
    const listOfItems = this.props.cart.cartItems.map((item) => {
      return (
        <div className="list-of-items">
          <CartItem item={item} key={item.id} />
          <button className="remove-item" onClick={ () => this.props.removeItem(item, this.props.isLoggedIn) }>Remove</button>
        </div>
      )
    })
    return (
      <div>
        <h1>Items in Cart</h1>
        <ul>
          {listOfItems}
        </ul>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
