/* eslint-disable no-fallthrough */
import axios from 'axios'

const SET_CART = "SET_CART"
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const USER_GET_CART = 'USER_GET_CART'

export const CLEAR_CART = 'CLEAR_CART'

const _userGetCart = (cart) => {
  return {
    type: USER_GET_CART,
    cart
  }
}

const addToCart = (product, itemQty = 1) => {
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

export const userGetCart = (credential = localStorage.token) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/carts/${credential}`)
    dispatch(_userGetCart(data))
  } catch(error) {
    console.log(error)
  }
}

export const clearCart = (cart, isLoggedIn) => {
  return async (dispatch) => {
    if(!isLoggedIn) {
      const { data } = await axios.post("/api/carts/guest-checkout", cart)
      // could use data to render useful information on checkout confirmation later on
      dispatch(_clearCart())
      localStorage.removeItem('cart')
    } else {
      await axios.post("/api/carts/user-checkout", cart)
    }
  }
}

export const setCart = () => {
  return (dispatch) => {
    if(!localStorage.token && localStorage.cart) {
      dispatch(_setCart(JSON.parse(localStorage.getItem('cart'))))
    }
  }
}

export const addItemToCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } else {
      try {
        await axios.post(`/api/carts/${product.id}/${localStorage.token}`)
      } catch(error) {
        console.log(error)
      }
    }
  }
}

export const deleteFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {

    if (!isLoggedIn) {
      dispatch(_deleteFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } else {
      try {
        await axios.delete(
          `/api/carts/${product.cartSpaceship.cartId}/${product.cartSpaceship.spaceshipId}`
        )
        dispatch(userGetCart())
      } catch(error) {
        console.log(error)
      }
    }
  }
}

export const decrementItemFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_decrementItemFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } else {
      try {
        await axios.put(`/api/carts/${product.id}/${localStorage.token}`)
        dispatch(userGetCart())
      } catch(error) {
        console.log(error)
      }
    }
  }
}

export const incrementItemFromCart = (product, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_incrementItemFromCart(product))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    }else {
      try {
        await axios.post(`/api/carts/${product.id}/${localStorage.token}`)
        dispatch(userGetCart())
      } catch(error) {
        console.log(error)
      }
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
    case USER_GET_CART:{
      let itemsArray = []

      for(let i = 0; i < action.cart.spaceships.length; i++) {
        itemsArray.push(
          {
            ...action.cart.spaceships[i],
            itemQty: action.cart.spaceships[i].cartSpaceship.itemQty,
            cartId: action.cart.spaceships[i].cartSpaceship.cartId,
            spaceshipId: action.cart.spaceships[i].cartSpaceship.spaceshipId
          })
      }

      return {...state, ...action.cart, cartItems: [...itemsArray]}

    }

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

