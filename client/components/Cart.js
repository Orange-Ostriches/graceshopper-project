import React from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'

class Cart extends React.Component {
  render() {
    const listOfItems = this.props.cart.cartItems.map((item) => {
      return (
        <div className="list-of-items">
          <CartItem item={item} key={item.id} />
        </div>
      )
    })
    return (
      <div>
        <h1>Items in Cart</h1>
        <div className="cart-item">
          <ul className="cart-item-list">
            {listOfItems}
          </ul>
          </div>
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

export default connect(mapStateToProps)(Cart)
