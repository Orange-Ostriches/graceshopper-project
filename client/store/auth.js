import axios from 'axios'
import history from '../history'
import { clearCart } from './cart'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const LOG_OUT = 'LOG_OUT'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const logOut = () => ({type: LOG_OUT, auth: {}})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)

  if (token) {

    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
        spaceships: localStorage.cart
      }
    })

    const { data } = await axios.get(`/carts/${res.data.id}`)
    console.log(data)
    
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem(TOKEN)
    localStorage.removeItem('cart')
    dispatch(clearCart())
    dispatch(logOut())
    history.push('/login')
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case LOG_OUT:
      return action.auth
    default:
      return state
  }
}
