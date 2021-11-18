import axios from 'axios';

const SET_USER = 'SET_USER';

const _setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const setUser = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/auth`);
      dispatch(_setUser(data));
    } catch (error) {
      console.log(error);
    }
  }
}


export const updateUser = user => {
  console.log('updateUser', user);
  return async dispatch => {
    try {
      const { data } = await axios.put(`/auth/${user.id}`, user)
      dispatch(_setUser(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    default:
      return state;
  }
}
