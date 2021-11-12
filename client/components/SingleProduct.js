import React from 'react'
import { Link } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'
import { connect } from 'react-redux'

class SingleProduct extends React.Component {
  componentDidMount() {
      this.props.getSingleProduct(this.props.match.params.id);
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
            <img width="400px" src={product.image} alt={product.name} />
          </div>
          <div className="single-product-info">
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <p>Description: {product.description}</p>
            <p>Size:
              <select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </p>
            <button className="add-to-cart">Add To Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

const dispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, dispatchToProps)(SingleProduct)
