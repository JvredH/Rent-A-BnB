import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'

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

export const createSpot = (newSpot) => {
  return ({
    type: CREATE_SPOT,
    newSpot
  })
}

export const editSpot = (updates) => {
  return ({
    type: EDIT_SPOT,
    updates
  })
}


// Thunks
export const getAllSpotsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spots = await response.json();
    // console.log(spots)
    dispatch(loadSpots(spots))
  }
}

export const getOneSpotThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOneSpot(spot))
  }
}

export const deleteOneSpotThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
}

export const createSpotThunk = (spotToCreate, newSpotImage) => async dispatch => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spotToCreate)
  });

  if (response.ok) {
    const newSpotData = await response.json();
    const response2 = await csrfFetch(`/api/spots/${newSpotData.id}/images`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newSpotImage)
    });

    if (response2.ok) {
      const newImgData = await response2.json();
      newSpotData.previewImage = newImgData.url;
      dispatch(createSpot(newSpotData))
      return newSpotData
    }
  }
}

export const editSpotThunk = (spotToCreate, id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spotToCreate)
  })

  if (response.ok) {
    const updates = await response.json();
    dispatch(editSpot(updates))
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
      const newState = {...state};
      // console.log('action.spot ====> ', action.spot)
      newState[action.spot.id] = action.spot
      // console.log('from reducer ===> ', newState)
      return newState;
    }
    case CREATE_SPOT : {
      const newState = {...state};
      newState[action.newSpot.id] = action.newSpot
      return newState
    }
    case EDIT_SPOT : {
      const newState = {...state};
      newState[action.updates.id] = action.updates;
      return newState
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
