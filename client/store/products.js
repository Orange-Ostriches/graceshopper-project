import axios from 'axios';

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';

// Action Creators
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

// Thunks
export const fetchProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/spaceships')
    dispatch(setProducts(data))
  } catch (error) {
    console.log(error)
  }
}

// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
