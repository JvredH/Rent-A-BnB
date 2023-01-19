import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

// Action Creators
export const loadReviews = (reviews) => {
  return ({
    type: LOAD_REVIEWS,
    reviews
  })
}

// Thunks
export const loadSpotReviewsThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS : {
      // console.log('reviews ====' , action)
      const newState = {};
      action.reviews.Reviews.forEach(review => {
        newState[review.id] = review
      })
      console.log('newState', newState)
      return newState;
    }
    default: {
      return state
    }
  }
}

export default reviewsReducer;
