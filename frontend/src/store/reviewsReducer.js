import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

export const loadReviews = (spotReviews) => {
  return ({
    type: LOAD_REVIEWS,
    spotReviews
  })
}

export const loadSpotReviewsThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const spotReviews = await response.json();
    // console.log('fresh from thunker... ----- > ', spotReviews)
    dispatch(loadReviews(spotReviews))
  }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS : {
      const newState = {};
      // console.log(action.spotReviews)
      action.spotReviews.Reviews.forEach(review => {
        newState[review.id] = review;
      })
      // console.log(newState)
      return newState;
    }
    default: {
      return state
    }
  }
}

 export default reviewsReducer;
