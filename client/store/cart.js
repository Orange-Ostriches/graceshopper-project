import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = (product, qty = 1 ) => {
  return {
    type: ADD_TO_CART,
    product: {...product, qty}
  }
}

<<<<<<< HEAD
export const addItemToCart = (product) => {
  return async (dispatch) => {
    try {
      // or check localStorage
      const res = await axios.post(`/api/carts`, product )
      const addedProduct = res.data
      console.log('THUNK', addedProduct)
      dispatch(addToCart(addedProduct))
    } catch (error) {
      console.log(error)
=======
export const addItemToCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if(!isLoggedIn) {
      dispatch(addToCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
>>>>>>> 860e3317226317a0b85612106e3674ec20fbab5a
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

      const existingItem = state.cartItems.find((item) => {
        return item.id === action.product.id})

      if(existingItem) {

        action.product.qty += existingItem['qty']

        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            return item === existingItem ? action.product : item
          })
          }
        }

      else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.product]
        }
      }

      default:
        return state
    }


}

