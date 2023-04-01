import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSpotsThunk } from "../../store/usersDataReducer";
import SpotCards from "../SpotsCards";


const UsersSpots = () => {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const userSpots = useSelector(state => state.usersData.usersSpots);
  const spotsArr = Object.values(userSpots)



  useEffect(() => {
    dispatch(getUsersSpotsThunk(userId))
  }, [dispatch])



  return (
    <div className='Spots-main-div'>
      {spotsArr.map(spot => <SpotCards spot={spot} /> )}
    </div>
  )
}

export default UsersSpots;
