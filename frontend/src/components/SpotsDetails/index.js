import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spotsReducer";
import './SpotDetails.css'
import DeleteSpot from "./DeleteSpot";
// import EditSpot from "../SpotsForms/EditSpot";
import { Link } from "react-router-dom";

const SpotDetails = () => {
  let {spotId} = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  console.log('spot ====> ', spot)
  // console.log('user ====> ', user)
  const star = String.fromCharCode(0x2605)


  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  let session;

  if (user && user.id === spot.ownerId) {
    session = (
      <div>
        <Link to={`/spots/${spot.id}/edit`}>
          <button>Edit</button>
        </Link>
        <DeleteSpot spot={spot}/>
      </div>
    )
  } else {
    session = null;
  }


  return(
    <>
      {isLoaded && (
        <div>
          <div>
            <h1>{spot.name}</h1>
          </div>
          <div className='spot-location-container'>
            <p>{`${star} ${spot.avgStarRating} - ${spot.numReviews} reviews - ${spot.city}, ${spot.state}, ${spot.country}`}</p>
            {session}
            {/* <div>
              <Link to={`/spots/${spot.id}/edit`}>
                <button>Edit</button>
              </Link>
              <DeleteSpot spot={spot}/>
            </div> */}
          </div>
          <div>
            <img alt='' src={`${spot.SpotImages[0].url}`}/>
          </div>
          <div className='under-image-section'>
            <div className='host-desc'>
              <h3>Entire Home Hosted By {spot.Owner.firstName}</h3>
              <p className='description'>{spot.description}</p>
            </div>
            <div>price x Review, throw create button in here</div>
          </div>
        </div>
      )}
    </>
  )
}

export default SpotDetails;
