/* eslint-disable no-fallthrough */
import axios from 'axios'

const SET_CART = "SET_CART"
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const CLEAR_CART = 'CLEAR_CART'

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

export const clearCart = (isLoggedIn, cart) => {
  return async (dispatch) => {
    if(!isLoggedIn) {
      console.log(cart)
      const { data } = await axios.post("/api/carts/guest-checkout", cart)
      console.log(data)
      // dispatch(_clearCart())
      // localStorage.clear()
    }
  }
}

export const setCart = (cart, isLoggedIn) => {
  return (dispatch) => {
    if(!isLoggedIn) {
      dispatch(_setCart(cart))
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
  return (dispatch, getState) => {
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
  return (dispatch, getState) => {
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

