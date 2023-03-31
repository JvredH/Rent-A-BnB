import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editBookingThunk, getUsersBookingsThunk } from "../../store/bookingsReducer";

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors && errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)}/>
        <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)}/>
        <button type='submit'>Edit Booking</button>
      </form>
    </div>
  )
}

export default EditBooking;
