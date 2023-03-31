import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'session/CREATE_BOOKING'
const GET_USER_BOOKINGS = 'session/GET_USER_BOOKINGS'
const EDIT_BOOKING = 'session/EDIT_BOOKING'
const DELETE_BOOKING ='session/DELETE_BOOKING'

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

const editBookingAction = (updatedDates) => {
  return ({
    type: EDIT_BOOKING,
    updatedDates
  })
}

const deleteBookingAction = (bookingId) => {
  return({
    type: DELETE_BOOKING,
    bookingId
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

export const editBookingThunk = (newDates, bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newDates)
  })

  if (response.ok) {
    const updatedDates = await response.json();
    dispatch(editBookingAction(updatedDates));
    return updatedDates;
  }
}

export const deleteBookingThunk = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteBookingAction(bookingId))
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
    case EDIT_BOOKING: {
      const newState = {...state};
      newState.usersBookings[action.updatedDates.id].startDate = action.updatedDates.startDate
      newState.usersBookings[action.updatedDates.id].endDate = action.updatedDates.endDate
      return newState
    }
    case DELETE_BOOKING: {
      const newState = {...state};
      delete newState.usersBookings[action.bookingId];
      return newState;
    }
    default:
      return state
  }
}

export default bookingsReducer;
