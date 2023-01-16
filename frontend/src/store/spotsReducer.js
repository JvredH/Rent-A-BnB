import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'

// Actions
export const loadSpots = (spots) => {
  return ({
    type: LOAD_SPOTS,
    spots
  })
}

// Thunks
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spots = await response.json();
    // console.log(spots)
    dispatch(loadSpots(spots))
  }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS : {
      const newState = {...state};
      console.log('from reducer: ', action.spots)
      action.spots.Spots.forEach(spot => {
        // console.log('spot id: ====>', spot.id)
        newState[spot.id] = spot
      })
      return newState
    }
    default: {
      return state
    }
  }
}

export default spotsReducer;
