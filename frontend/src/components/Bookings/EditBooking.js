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

  const startDateInput =
  new Date(booking.startDate) >= new Date() ? (
    <div>
      <div>Start Date</div>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    </div>
  ) : <div>Trip has already started</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors && errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {startDateInput}
        <div>End Date</div>
        <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)}/>
        <button type='submit'>Edit Booking</button>
      </form>
    </div>
  )
}

export default EditBooking;
