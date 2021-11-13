import React from 'react'
import { connect } from 'react-redux'

class CartItem extends React.Component {

  render() {

    return (
      <li>
        <p>{this.props.item.name}</p>
        <p>Quantity: {this.props.item.qty}</p>
      </li>
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
