import axios from "axios";
// import { DELETE } from "sequelize/types/lib/query-types";

// Action Types
const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";

// Action Creators
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

// Thunks
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/spaceships");
    dispatch(setProducts(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data: deleted } = await axios.delete(`/api/spaceships/${id}`, {
      headers: {
        Authorization: window.localStorage.token,
      },
    });
    dispatch(_deleteProduct(deleted));
  } catch (error) {
    alert(
      "Could not delete this product right now. Contact developers for help."
    );
  }
};

// Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
