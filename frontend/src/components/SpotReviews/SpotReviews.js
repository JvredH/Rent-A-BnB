import { loadSpotReviewsThunk } from "../../store/reviewsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReviewCards from "./ReviewCards.js";


const SpotReviews = ({spot}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews)
  const star = String.fromCharCode(0x2605)

  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spot.id))
  } , [dispatch, spot.id])

  return (
    <>
      <h3>{`${star} ${spot.avgStarRating} - ${spot.numReviews} Reviews`}</h3>
      <div className='main-card-container'> <ReviewCards spot={spot} reviews={reviews} star={star}/> </div>
    </>
  );
}

export default SpotReviews;
