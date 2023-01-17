import { deleteOneSpot } from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const DeleteSpot = ({spot}) => {
  const dispatch = useDispatch()
  const spotId = spot.id
  console.log(spot)

  const handleDelete = () => {
    dispatch(deleteOneSpot(spotId))
    return <Redirect to ='/'/>
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteSpot;
