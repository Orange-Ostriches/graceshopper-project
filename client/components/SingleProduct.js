import React from 'react'
import { Link } from 'react-router-dom'
import { fetchSingleProduct } from '../store/product'
import { connect } from 'react-redux'
import { addItemToCart } from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
    } catch (error) {
      console.error(error)
    }
  }

  handleClick = (event) => {
    this.props.itemToCart(this.props.product, this.props.isLoggedIn)
    alert('Added to cart!')
  }

  render() {
    const { product } = this.props
    return (
      <div>
        <div className="back-to-home">
          <Link to="/products">Back to All Spaceships</Link>
        </div>
        <div className="single-product-container">
          <div className="single-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="single-product-info">
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <p>Description: {product.description}</p>
            <button className="add-to-cart" onClick={this.handleClick}>Add To Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
    isLoggedIn: !!state.auth.id
  }
}

const dispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    itemToCart: (item) => dispatch(addItemToCart(item))
  }
}

export default connect(mapStateToProps, dispatchToProps)(SingleProduct)
