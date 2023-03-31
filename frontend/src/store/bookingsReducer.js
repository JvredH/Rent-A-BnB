import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'session/CREATE_BOOKING'
const GET_USER_BOOKINGS = 'session/GET_USER_BOOKINGS'

const createBookingAction = (createdBooking) => {
  return({
    type: CREATE_BOOKING,
    createdBooking
  })
}

const getUserBookingsAction = (userBookings) => {
  return ({
    type: GET_USER_BOOKINGS,
    userBookings
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

export const getUsersBookingsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/bookings/current`)

  if (response.ok) {
    const userBookings = await response.json();
    dispatch(getUserBookingsAction(userBookings))
    console.log('userBookings from thunk ----> ', userBookings)
    return userBookings
  }
}

const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = {usersBookings:{}, spotBookings:{}}

const bookingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_BOOKINGS: {
      const newState = {...state};
      newState.usersBookings = normalize(action.userBookings.Bookings)
      return newState
    }
    default:
      return state
  }
}

export default bookingsReducer;
