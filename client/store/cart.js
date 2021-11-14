import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const addToCart = (product, qty = 1) => {
  return {
    type: ADD_TO_CART,
    product: { ...product, qty }
  }
}

const deleteFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    product
  }
}

export const addItemToCart = (product, isLoggedIn) => {
  console.log(product)
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

export const removeItemFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    try {
      if (!isLoggedIn) {
        dispatch(deleteFromCart(product))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
      }
    } catch (error) {
      console.log(error)
    }
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
        return item.id === action.product.id
      })
      if (existingItem) {
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
    case REMOVE_FROM_CART:
      const existingItem2 = state.cartItems.find((item) => {
        return item.id === action.product.id
      })
      if (existingItem2) {
        action.product.qty -= 1
        if (action.product.qty < 1) {
          return {
            ...state, cartItems: state.cartItems.filter(item => item.id !== action.product.id)
          }
        } else {
          return {
            ...state, cartItems: state.cartItems.map((item) => {
              return item === existingItem2 ? action.product : item
            })
          }
        }
      }
    default:
      return state
  }
}

