import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'session/CREATE_BOOKING'

const createBookingAction = (createdBooking) => {
  return({
    type: CREATE_BOOKING,
    createdBooking
  })
}

export const createBookingThunk = (newBooking, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBooking)
  })

  if (response.ok) {
    const createdBooking = await response.json();
    dispatch(createBookingAction(createdBooking))
    console.log(createdBooking)
    return createdBooking;
  }
}


const bookingsReducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default bookingsReducer;
