import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spotsReducer";
import './SpotDetails.css'
import DeleteSpot from "./DeleteSpot";
import { Link } from "react-router-dom";
import SpotReviewCards from "../SpotReviews/SpotReviewCards";

const SpotDetails = () => {
  let {spotId} = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)

  const prevState = {...spot}
  const star = String.fromCharCode(0x2605)
  const bullet = String.fromCharCode(0x2022)
  const reviews = useSelector (state => state.reviews)

  const reviewsArray = Object.values(reviews)


  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId, reviews])


  let session;

  if (user && user.id === prevState.ownerId) {
    session = (
      <div>
        <Link to={`/spots/${spot.id}/edit`}>
          <button className='crud-button'>Edit</button>
        </Link>
        <DeleteSpot spot={spot}/>
      </div>
    )
  } else {
    session = null;
  }

  let reviewButton;

  if(!user || user.id === prevState.ownerId ) {
    reviewButton = (<div>{null}</div>)
  } else {
    reviewButton = <Link to={`/spots/${spotId}/reviews/new`}><button className='review-button'>Leave a Review</button></Link>
  }

  if (user) {
    reviewsArray.forEach(review => {
      if (review.User.id === user.id) {
        reviewButton = (<div>{null}</div>)
      }
    })
  }


  return(
    <>
      {isLoaded && (
        <div className='main-container'>
          <div>
            <h1>{spot.name}</h1>
          </div>
          <div className='spot-location-container'>
            <div className='spot-description'>
              <div>{`${star} ${spot.avgStarRating}`}</div>
              <div className='bullet'>{bullet}</div>
              <div className='numreviews'>{`${spot.numReviews} reviews`}</div>
              <div className='bullet'>{bullet}</div>
              <div className='location'>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
            </div>
            {session}
          </div>
          <div className='image-container'>
            <img alt='' className='image' src={`${spot.SpotImages[0].url}`}/>
          </div>
          <div className='under-image-section'>
            <div className='host-desc'>
              <h2 className='host'>Entire Spot Hosted By {spot.Owner.firstName}</h2>
              <p className='description'>{spot.description}</p>
            </div>
            <div className='right-desc'>
              <div className='right-desc-price'>
                <div className='price'>{`$${spot.price} night`}</div>
                <div>{`${star} ${bullet} ${spot.avgStarRating} ${bullet} ${spot.numReviews} reviews `}</div>
              </div>
              <div className='review-button-container'>{reviewButton}</div>

            </div>
          </div>
          <div className='box-under-host-desc'>
            <h3>{`${star} ${spot.avgStarRating} ${bullet} ${spot.numReviews} Reviews`}</h3>
            <div className='main-review-card-container'> <SpotReviewCards spot={spot} user={user}/> </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SpotDetails;
