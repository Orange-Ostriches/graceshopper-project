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

  handleClick = () => {
    this.props.itemToCart(this.props.product)
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
            <p>Qty:
              <select>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
                <option value="four">4</option>
                <option value="five">5</option>
              </select>
            </p>
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
    cart: state.cart
  }
}

const dispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    itemToCart: (item) => dispatch(addItemToCart(item))
  }
}

export default connect(mapStateToProps, dispatchToProps)(SingleProduct)
