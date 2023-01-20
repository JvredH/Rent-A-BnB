import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spotsReducer";
import './SpotDetails.css'
import DeleteSpot from "./DeleteSpot";
// import EditSpot from "../SpotsForms/EditSpot";
import { Link } from "react-router-dom";
import SpotReviewCards from "../SpotReviews/SpotReviewCards";

const SpotDetails = () => {
  let {spotId} = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  // console.log('spot ====> ', spot)
  // console.log('user ====> ', user)
  const prevState = {...spot}
  const star = String.fromCharCode(0x2605)
  const reviews = useSelector (state => state.reviews)
  console.log('prevState ====' , prevState);


  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId, reviews])

  let session;

  if (user && user.id === prevState.ownerId) {
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

  let reviewButton;

  if(!user || user.id === prevState.ownerId) {
    reviewButton = (<div>{null}</div>)
  } else {
    reviewButton = <Link to={`/spots/${spotId}/reviews/new`}><button>Leave a Review</button></Link>
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
              <h3>Entire Spot Hosted By {spot.Owner.firstName}</h3>
              <p className='description'>{spot.description}</p>
            </div>
            <div className='right-desc'>
              <div>
                <div>{`${spot.price} night`}</div>
                <div>{`${star} - ${spot.avgStarRating} - ${spot.numReviews} reviews `}</div>
              </div>
              {reviewButton}
              {/* <Link to={`/spots/${spotId}/reviews/new`}><button>Leave a Review</button></Link> */}
            </div>
          </div>
          <div className='box-under-host-desc'>
            <h3>{`${star} ${spot.avgStarRating} - ${spot.numReviews} Reviews`}</h3>
            <div className='whole-card-container'> <SpotReviewCards spot={spot} user={user}/> </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SpotDetails;
