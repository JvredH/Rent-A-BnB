import { csrfFetch } from "./csrf"

const GET_USERS_SPOTS = 'session/GET_USERS_SPOTS'

const getUsersSpotsAction = (userSpots) => {
  return ({
    type: GET_USERS_SPOTS,
    userSpots
  })
}

export const getUsersSpotsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/spots/current`)

  if (response.ok) {
    const userSpots = await response.json();
    dispatch(getUsersSpotsAction(userSpots));
    return userSpots
  }
}


const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = { usersSpots: {} }

const usersDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS_SPOTS: {
      const newState = {...state};
      newState.usersSpots = normalize(action.userSpots.Spots);
      return newState;
    }
    default:
      return state
  }
}

export default usersDataReducer;
