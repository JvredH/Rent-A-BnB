import { deleteOneSpotThunk } from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

const DeleteSpot = ({spot}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const spotId = spot.id
  const {closeModal} = useModal()
  // console.log(spot)

  const handleDelete = async (e) => {

    return await dispatch(deleteOneSpotThunk(spotId))
      .then(() => history.push('/'))
      .then(() => closeModal())
    // return <Redirect to ='/'/>
  }

  const handleNo = () => {
    closeModal()
  }

  return (
    <div className='booking-cancel-modal'>
      <div>Are You Sure You Want To Delete This Spot?</div>
      <div className='cancel-booking-btn-container'>
        <button onClick={handleDelete} className='yes-btn'>Yes</button>
        <button onClick={handleNo} className='no-btn'>No</button>
      </div>
    </div>
  );
}

export default DeleteSpot;
