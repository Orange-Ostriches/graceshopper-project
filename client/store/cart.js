/* eslint-disable no-fallthrough */
import axios from 'axios'
import history from '../history'

const SET_CART = "SET_CART"
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
export const CLEAR_CART = 'CLEAR_CART'

const addToCart = (product, itemQty = 1) => {
  return {
    type: ADD_TO_CART,
    product: { ...product, itemQty }
  }
}

const _deleteFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    product
  }
}

const _decrementItemFromCart = (product) => {
  return {
    type: DECREMENT_ITEM,
    product
  }
}

const _incrementItemFromCart = (product) => {
  return {
    type: INCREMENT_ITEM,
    product
  }
}

const _setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems
  }
}

const _clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const clearCart = (isLoggedIn, cart) => {
  return async (dispatch) => {
    if(localStorage.token) {
      const { data } = await axios.post("/api/carts/guest-checkout", cart)
      // could use data to render useful information on checkout confirmation later on
      dispatch(_clearCart())
      localStorage.removeItem('cart')
    }
    dispatch(_clearCart())
  }
}

export const setCart = () => {
  return (dispatch) => {
    if(localStorage.cart) {
      dispatch(_setCart(JSON.parse(localStorage.getItem('cart'))))
    }
  }
}

export const addItemToCart = (product, isLoggedIn) => {
  return (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

export const deleteFromCart = (product, isLoggedIn) => {
  return (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_deleteFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

export const decrementItemFromCart = (product, isLoggedIn) => {
  return (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_decrementItemFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

export const incrementItemFromCart = (product, isLoggedIn) => {
  return (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_incrementItemFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

const initialCart = {
  totalProducts: 0,
  subtotal: 0,
  cartItems: []
}

export default function (state = initialCart, action) {
  switch (action.type) {
    case CLEAR_CART: {
      return {...state, cartItems: []}
    }
    case SET_CART: {
      return {...state, cartItems: [...action.cartItems]}
    }
    case ADD_TO_CART: {
      const existingItem = state.cartItems.find((item) => {
        return item.id === action.product.id
      })
      if (existingItem) {
        action.product.itemQty += existingItem.itemQty
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
    }
    case DECREMENT_ITEM: {
      const existingItem = state.cartItems.find((item) => {
        return item.id === action.product.id
      })
      if (existingItem) {
        action.product.itemQty -= 1
        if (action.product.itemQty < 1) {
          return {
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== action.product.id)
          }
        } else {
          return {
            ...state, cartItems: state.cartItems.map((item) => {
              return item === existingItem ? action.product : item
            })
          }
        }
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.product.id)
      }
    }

    case INCREMENT_ITEM: {
      const existingItem = state.cartItems.find((item) => {
        return item.id === action.product.id
      })
      if (existingItem) {
        action.product.itemQty += 1
        return {
          ...state, cartItems: state.cartItems.map((item) => {
            return item === existingItem ? action.product : item
          })
        }
      }
    }

    default:
      return state
  }
}

