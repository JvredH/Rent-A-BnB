import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getUsersBookingsThunk } from "../../store/bookingsReducer";

const UsersBookings = () => {
  // const {userId} = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.usersBookings)
  const bookingsArr = Object.values(bookings)

  console.log('bookings arr ----> ',bookingsArr)

  useEffect(() => {
    dispatch(getUsersBookingsThunk())

  }, [dispatch])

  return <div>Hello From users bookings component</div>
}

export default UsersBookings;
