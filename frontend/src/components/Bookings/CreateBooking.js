import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookingThunk } from "../../store/bookingsReducer";

const CreateBooking = ({spotId, spot, sessionUser}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(today.toISOString().slice(0,10));
  const [endDate, setEndDate] = useState(tomorrow.toISOString().slice(0,10));
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    const newBooking = {
      startDate,
      endDate
    }

    dispatch(createBookingThunk(newBooking, spotId))

    // push to users bookings, have the newer bookings show up a the top of the list.
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)}/>
        <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)}/>
        <button type='submit'>Reserve</button>
      </form>
    </div>
  )
}

export default CreateBooking;
