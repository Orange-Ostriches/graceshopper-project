import axios from 'axios'

/**
 * ACTION TYPES
 */
const CLEAR_CART = 'USER_CLEAR_CART'
const USER_SET_CART = "USER_SET_CART"
const USER_ADD_TO_CART = 'USER_ADD_TO_CART'
const USER_REMOVE_FROM_CART = 'USER_REMOVE_FROM_CART'
const USER_DECREMENT_ITEM = 'USER_DECREMENT_ITEM'
const USER_INCREMENT_ITEM = 'USER_INCREMENT_ITEM'
const USER_CHECKOUT = 'USER_CHECKOUT'
const USER_GET_CART = 'USER_GET_CART'


/**
 * ACTION CREATORS
 */
const _userGetCart = (cart) => {
  return {
    type: USER_GET_CART,
    cart
  }
}
/**
 * THUNK CREATORS
 */
// export const userGetCart = (userId) => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/carts/${userId}`)
//     dispatch(_userGetCart(data))
//   } catch(error) {
//     console.log(error)
//   }
// }

// const initialCart = {
//   totalProducts: 0,
//   subtotal: 0,
//   cartItems: []
// }

// export default function (state = initialCart, action) {
//   switch (action.type) {
//     case USER_GET_CART: {
//       let itemsArray = []

//       for(let i = 0; i < action.cart.cartSpaceships.length; i++) {
//         itemsArray.push(
//           {
//             ...action.cart.spaceships[i],
//             itemQty: action.cart.cartSpaceships[i].itemQty
//           })
//       }

//       return {...state, ...action.cart, cartItems: [...itemsArray]}
//     }

//     default:
//       return state
//   }
// }
