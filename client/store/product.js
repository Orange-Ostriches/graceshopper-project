import axios from "axios";

const SINGLE_PRODUCT = "SINGLE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

const getSingleProduct = (product) => ({
  type: SINGLE_PRODUCT,
  product,
});

const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/spaceships/${id}`);
      dispatch(getSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/spaceships/create`, product, {
        headers: {
          Authorization: window.localStorage.token,
        },
      });
      dispatch(getSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/spaceships/${product.id}`,
        product,
        {
          headers: {
            Authorization: window.localStorage.token,
          },
        }
      );
      dispatch(_updateProduct(updated));
    } catch (error) {
      console.error(error);
      alert(
        "Could not edit this product currently. Please contact the engineering team."
      );
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
