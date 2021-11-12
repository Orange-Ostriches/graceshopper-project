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
      console.log('this is product', product)
      const res = await axios.post(`/api/carts`, product )
      const addedProduct = res.data
      console.log('this is added', addedProduct)
      dispatch(addToCart(addedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  cart: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.product] }
    default:
      return state
  }
}
