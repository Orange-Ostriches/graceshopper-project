import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = (product, qty ) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const addItemToCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if(!isLoggedIn) {
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
      dispatch(addToCart(product))
    }
    // else {
    //   try {
    //     // or check localStorage
    //     const res = await axios.put(`/api/carts`, product )
    //     const addedProduct = res.data
    //     console.log('THUNK', addedProduct)
    //     dispatch(addToCart(addedProduct))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}

//

const initialCart = {
  totalProducts: 0,
  subtotal: 0,
  cartItems: []
}

export default function (state = initialCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product]
      }
    default:
      return state
  }
}
