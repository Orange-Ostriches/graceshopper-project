/* eslint-disable no-fallthrough */
import axios from 'axios'

const SET_CART = "SET_CART"
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const CLEAR_CART = 'CLEAR_CART'

const addToCart = (product, qty = 1) => {
  return {
    type: ADD_TO_CART,
    product: { ...product, qty }
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

const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

const _clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const clearCart = () => {
  return async (dispatch) => {
    dispatch(_clearCart())
    localStorage.clear()
  }
}

export const setCart = (cart, isLoggedIn) => {
  return async (dispatch) => {
    if(!isLoggedIn) {
      dispatch(_setCart(cart))
    }
  }
}

export const addItemToCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }
  }
}

export const deleteFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    try {
      if (!isLoggedIn) {
        dispatch(_deleteFromCart(product))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const decrementItemFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    try {
      if (!isLoggedIn) {
        dispatch(_decrementItemFromCart(product))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const incrementItemFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    try {
      if (!isLoggedIn) {
        dispatch(_incrementItemFromCart(product))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
      }
    } catch (error) {
      console.log(error)
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
      console.log(action.cart)
      return {...state, ...action.cart}
    }
    case ADD_TO_CART: {
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
    }
    case DECREMENT_ITEM: {
      const existingItem = state.cartItems.find((item) => {
        return item.id === action.product.id
      })
      if (existingItem) {
        action.product.qty -= 1
        if (action.product.qty < 1) {
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
        action.product.qty += 1
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

