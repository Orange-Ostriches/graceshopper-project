import axios from 'axios'

/**
 * ACTION TYPES
 */
const CLEAR_CART = 'CLEAR_CART'
const USER_SET_CART = "SET_CART"
const USER_ADD_TO_CART = 'ADD_TO_CART'
const USER_REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const USER_DECREMENT_ITEM = 'DECREMENT_ITEM'
const USER_INCREMENT_ITEM = 'INCREMENT_ITEM'
const USER_CHECKOUT = 'CHECKOUT'

const initialCart = {
  totalProducts: 0,
  subtotal: 0,
  cartItems: []
}

export default function (state = initialCart, action) {
  switch (action.type) {
    default:
      return state
  }
}
