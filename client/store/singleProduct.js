import axios from 'axios'

const SINGLE_PRODUCT = "SINGLE_PRODUCT"

const getSingleProduct = product => ({
  type: SINGLE_PRODUCT,
  product
});

export const fetchSingleProduct = (id) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/spaceships/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
