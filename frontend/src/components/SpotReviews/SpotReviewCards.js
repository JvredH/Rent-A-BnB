import { useDispatch, useSelector} from "react-redux";
import { loadSpotReviewsThunk } from "../../store/reviewsReducer";
import { useEffect } from "react";
import DeleteReview from "./DeleteReview";

const SpotReviewCards = ({spot, user}) => {
  const dispatch = useDispatch();
  const allReviews = useSelector(state => state.reviews)
  const reviewsArray = Object.values(allReviews)
  // console.log('from spotReviewCards.js ', reviewsArray);
  const star = String.fromCharCode(0x2605)
  console.log(`user from review card`, user)

  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spot.id))
  } , [dispatch, spot.id])

  let xButton;


  const cards = reviewsArray.map(review => {
    let dateString = review.createdAt;
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString('default', {month: 'long', year:'numeric'})
    console.log(review)


    if (review.userId === user.id) {
      xButton = (
        <div className='name-delete'>
          <div>{review.User.firstName}</div>
          <div><DeleteReview review={review}/></div>
      </div>
      )
    } else {
      xButton = (
        <div className='name-delete'>
          <div>{review.User.firstName}</div>
          <div>{null}</div>
        </div>
      )
    }

    return (
      <div className='review-card' key={review.id}>
        {xButton}
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
