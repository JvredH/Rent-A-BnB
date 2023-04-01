import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookingThunk } from "../../store/bookingsReducer";
import './createBooking.css'

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

    return await dispatch(createBookingThunk(newBooking, spotId))
    .then(() => history.push(`/users/${sessionUser.id}/trips`))
    .catch(
      async (res) => {
        const data = await res.json();
        console.log('errors', errors)
        if (data && data.errors) setErrors(Object.values(data.errors))
        if (data && data.messages) setErrors(Object.values(data.messages))
      }
    )
  }

  let buttonContent;
  let disabled;
  if (sessionUser && sessionUser.id === spot.Owner.id) {
    buttonContent = 'Spot Owner Cannot Reserve Their Spot'
    disabled = true
  } else if (!sessionUser) {
    buttonContent = 'Log In To Reserve'
    disabled = true
  } else {
    buttonContent ='Reserve'
    disabled = false
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors && errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='date-input-container'>
          <input id='create-date-input-start' type='date' value={startDate} onChange={e => setStartDate(e.target.value)}/>
          <input id='create-date-input-end' type='date' value={endDate} onChange={e => setEndDate(e.target.value)}/>
        </div>
        <button className='create-button' type='submit' disabled={disabled}>{buttonContent}</button>
      </form>
    </div>
  )
}

export default CreateBooking;
