import React from 'react'
import { connect } from 'react-redux'

class CartItem extends React.Component {

  render() {
    const { item } = this.props;
    return (
      <div className="cart-item">
        <ul className="cart-item-list">
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


export default connect(mapStateToProps)(CartItem)
