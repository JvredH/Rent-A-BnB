import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SpotsForm from "./SpotsForm";

const EditSpot = () => {
  const {spotId} = useParams()
  const spot = useSelector((state) => state.spots[spotId])

  return (
    <SpotsForm spot={spot} formType='Edit Spot'/>
  );
}

export default EditSpot;
