import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// Actions
export const loadSpots = (spots) => {
  return ({
    type: LOAD_SPOTS,
    spots
  })
}

export const loadOneSpot = (spot) => {
  return ({
    type: LOAD_ONE_SPOT,
    spot
  })
}

export const deleteSpot = (spotId) => {
  return({
    type: DELETE_SPOT,
    spotId
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

export const getOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOneSpot(spot))
  }
}

export const deleteOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
}



const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS : {
      const newState = {...state};
      // console.log('from reducer: ', action.spots)
      action.spots.Spots.forEach(spot => {
        // console.log('spot id: ====>', spot.id)
        newState[spot.id] = spot
      })
      return newState
    }
    case LOAD_ONE_SPOT : {
      // console.log('from reducer ===> ', state)
      const newState = {};
      // console.log('action.spot ====> ', action.spot)
      newState[action.spot.id] = action.spot
      console.log('from reducer ===> ', newState)
      return newState;
    }
    case DELETE_SPOT : {
      const newState = {...state};
      delete newState[action.spotId];
      return newState
    }
    default: {
      return state
    }
  }
}

export default spotsReducer;