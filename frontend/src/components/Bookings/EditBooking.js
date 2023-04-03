import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editBookingThunk, getUsersBookingsThunk } from "../../store/bookingsReducer";
import './editBookings.css'
import { useParams } from "react-router-dom";

const EditBooking = ({booking}) => {
  const {userId} = useParams()
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    const newDates = {
      startDate,
      endDate
    }

    return await dispatch(editBookingThunk(newDates, booking.id))
      .then(() => dispatch(getUsersBookingsThunk(userId)))
      .then(() => closeModal())
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors))
          if (data && data.messages) setErrors(Object.values(data.messages))
        }
      )

  }

  const handleCancel = () => {
    closeModal()
  }

  const startDateInput =
  new Date(booking.startDate) >= new Date() ? (
    <div>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    </div>
  ) : <div className='trip-started'>Trip has already started</div>;

  return (
    <div className='edit-booking-modal'>
      <form className='edit-booking-form' onSubmit={handleSubmit}>
        <div className='edit-booking-form-title'>Edit Your Trip.</div>
        <ul className='errors'>
          {errors && errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='edit-booking-label'>Start Date</div>
        {startDateInput}
        <div className='edit-booking-label'>End Date</div>
        <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)}/>
        <button className='submit-booking-edit-btn' type='submit'>Edit Booking</button>
        <button className='submit-booking-edit-btn' id='edit-cancel-btn' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default EditBooking;
