import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const addItemToCart = (product) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/carts`, product )
      const addedProduct = res.data
      console.log(addedProduct)
      dispatch(addToCart(addedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
