import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSpotsThunk } from "../../store/usersDataReducer";
import SpotCards from "../SpotsCards";
import './usersSpots.css'


const UsersSpots = () => {
  const dispatch = useDispatch();
  let {userId} = useParams();
  const userSpots = useSelector(state => state.usersData.usersSpots);
  const spotsArr = Object.values(userSpots)

  useEffect(() => {
    dispatch(getUsersSpotsThunk(userId))
  }, [dispatch, userId])


  return (
    <div>
      <h1 className='users-spots-h1'>Your Spots!</h1>
      <div className='Spots-main-div'>
        {spotsArr.map(spot => <SpotCards spot={spot} userId={userId}/> )}
      </div>
    </div>
  )
}

export default UsersSpots;
