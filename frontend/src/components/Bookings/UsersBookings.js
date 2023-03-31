import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getUsersBookingsThunk } from "../../store/bookingsReducer";
import './usersBookings.css'

const UsersBookings = () => {
  // const {userId} = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.usersBookings)
  const bookingsArr = Object.values(bookings)

  

  useEffect(() => {
    dispatch(getUsersBookingsThunk())
  }, [dispatch])

  let bookingsCards;

  if (bookingsArr.length === 0) {
    bookingsCards = (<div>You have no trips coming up, book something!</div>)
  } else {
    bookingsCards = ( bookingsArr.map(booking => {
      let start = new Date(booking.startDate)
      let end = new Date(booking.endDate)
      let options = {year: 'numeric', month: 'long', day: 'numeric'}
      let formattedStart = start.toLocaleDateString('en-US', options)
      let formattedEnd = end.toLocaleDateString('en-US', options)

      return (
      <div className='bookings-card'>
        <div className='booking-card-left'>
          <div className='booking-card-left-top'>
            <div>{booking.Spot.name}</div>
            <div>{`${booking.Spot.address}`}</div>
            <div>{`${booking.Spot.city}, ${booking.Spot.state}`}</div>
            <div>{`${booking.Spot.country}`}</div>
          </div>
          <div className='booking-card-left-bottom'>
            <div>
              <div className="underline">Start Date</div>
              <div>{formattedStart}</div>
              <div className='underline end-date'>End Date</div>
              <div>{formattedEnd}</div>
            </div>
            <div>Edit/delete crud btns here</div>
          </div>
        </div>
        <div className='booking-card-right'>
          <div>
            <img className='booking-image' src={booking.Spot.previewImage}/>
          </div>
        </div>
      </div>
      )
    })
    )
  }

  return (
    <div className='users-bookings-main'>
      <h1>Your Trips!</h1>
      <div className='bookings-container'>
        {bookingsCards}
      </div>
    </div>
  )
}

export default UsersBookings;
