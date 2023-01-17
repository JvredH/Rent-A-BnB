import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spotsReducer";
import './SpotDetails.css'
import DeleteSpot from "./DeleteSpot";

const SpotDetails = () => {
  let {spotId} = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots[spotId])
  console.log('spot ====> ', spot)
  const star = String.fromCharCode(0x2605)


  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  return(
    <>
      {isLoaded && (
        <div>
          <div>
            <h1>{spot.name}</h1>
          </div>
          <div className='spot-location-container'>
            <p>{`${star} ${spot.avgStarRating} - ${spot.numReviews} reviews - ${spot.city}, ${spot.state}, ${spot.country}`}</p>
            <div>edit / <DeleteSpot spot={spot}/></div> {/* make it so that edit/delete only appears if owner of spot is viewing */}
          </div>
          <div>
            <img alt='' src={`${spot.SpotImages[0].url}`}/>
          </div>
        </div>
      )}
    </>
  )
}

export default SpotDetails;
