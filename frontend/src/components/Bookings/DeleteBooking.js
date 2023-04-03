import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getUsersBookingsThunk, deleteBookingThunk } from "../../store/bookingsReducer";
import { useParams } from "react-router-dom";
import './deleteBooking.css'

const DeleteBooking = ({booking}) => {
  const {userId} = useParams
  const {closeModal} = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])


  const handleYes = async e => {
    e.preventDefault();
    setErrors([]);

    return await dispatch(deleteBookingThunk(booking.id))
      .then(() => dispatch(getUsersBookingsThunk(userId)))
      .then(() => closeModal())
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
          if (data && data.message) setErrors(data.message)
        }
      )
  }

  const handleNo = () => {
    closeModal()
  }

  return (
    <div className='booking-cancel-modal'>
      {errors.length > 0 && ( <div className='errors'>{errors}</div> )}
      <div>Are you sure you want to cancel this trip?</div>
      <div className='cancel-booking-btn-container'>
        <button onClick={handleYes} className='yes-btn' >Yes</button>
        <button onClick={handleNo} className='no-btn'>No</button>
      </div>
    </div>
  )
}

export default DeleteBooking;
