import { deleteOneSpot } from "../../store/spotsReducer";
import { useDispatch } from "react-redux";

const DeleteSpot = ({spot}) => {
  const dispatch = useDispatch()
  const spotId = spot.id

  const handleDelete = (e) => {
    dispatch(deleteOneSpot(spotId))
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteSpot;
