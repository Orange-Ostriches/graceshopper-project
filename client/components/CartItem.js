import React from 'react'
import { connect } from 'react-redux'

class CartItem extends React.Component {

  render() {
    console.log(this.props.item)
    return (
        <p>{this.props.item.name}</p>
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
