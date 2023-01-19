import { useDispatch, useSelector} from "react-redux";
import { loadSpotReviewsThunk } from "../../store/reviewsReducer";
import { useEffect } from "react";

const SpotReviewCards = ({spot}) => {
  const dispatch = useDispatch();
  const allReviews = useSelector(state => state.reviews)
  const reviewsArray = Object.values(allReviews)
  // console.log('from spotReviewCards.js ', reviewsArray);
  const star = String.fromCharCode(0x2605)

  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spot.id))
  } , [dispatch, spot.id])


  const cards = reviewsArray.map(review => {
    let dateString = review.createdAt;
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString('default', {month: 'long', year:'numeric'})

    return (
      <div className='review-card'>
        <div>{review.User.firstName}</div>
        <div>{`${star} ${review.stars}`}</div>
        <div>{formattedDate}</div>
        <div>{review.review}</div>
      </div>
    )
  })

  return (
    cards
  );
}

export default SpotReviewCards;
