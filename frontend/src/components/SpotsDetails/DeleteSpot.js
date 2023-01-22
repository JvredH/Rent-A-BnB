import { deleteOneSpotThunk } from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const DeleteSpot = ({spot}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const spotId = spot.id
  // console.log(spot)

  const handleDelete = () => {
    dispatch(deleteOneSpotThunk(spotId))
    // return <Redirect to ='/'/>
    history.push('/')
  }

  return (
    <button onClick={handleDelete} className='crud-button'>Delete</button>
  );
}

export default DeleteSpot;
