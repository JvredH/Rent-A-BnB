import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const loadReviews = (spotReviews) => {
  return ({
    type: LOAD_REVIEWS,
    spotReviews
  })
}

export const createReview = (review, userInfo) => {
  return({
    type: CREATE_REVIEW,
    review,
    userInfo
  })
}

export const deleteReview = (reviewId) => {
  return({
    type: DELETE_REVIEW,
    reviewId
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

export const createReviewThunk = (newReview, userInfo, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews` , {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newReview)
  })

  if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review, userInfo))
  }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    dispatch(deleteReview(reviewId))
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
      console.log(newState)
      return newState;
    }
    case CREATE_REVIEW : {
      const newState = {...state};
      // console.log('in reducer', action.review)
      // console.log('in reducer', action.userInfo)
      newState[action.review.id] = {...action.review, ...action.userInfo}
      // console.log(newState)
      return newState
    }
    case DELETE_REVIEW : {
      const newState = {...state};
      delete newState[action.reviewId];
      return newState
    }
    default: {
      return state
    }
  }
}

 export default reviewsReducer;
