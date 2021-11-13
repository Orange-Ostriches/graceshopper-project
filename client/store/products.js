import axios from 'axios';

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';
const FEAT_PRODUCTS = 'FEAT_PRODUCTS';

// Action Creators
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const featProducts = featProducts => ({
  type: FEAT_PRODUCTS,
  featProducts
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

export const fetchFeatProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/spaceships/featured')
    dispatch(featProducts(data))
  } catch (error) {
    console.log(error)
  }
}

// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case FEAT_PRODUCTS:
      return action.featProducts
    default:
      return state
  }
}
