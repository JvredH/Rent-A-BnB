import { useDispatch, useSelector} from "react-redux";
import { loadSpotReviewsThunk } from "../../store/reviewsReducer";
import { useEffect } from "react";
import DeleteReview from "./DeleteReview";
import EditReviews from "./EditReviews";
import { NavLink } from "react-router-dom";
import './spotReviews.css'

const SpotReviewCards = ({spot, user}) => {
  const dispatch = useDispatch();
  const allReviews = useSelector(state => state.reviews)
  const reviewsArray = Object.values(allReviews)
  // console.log('from spotReviewCards.js ', reviewsArray);
  const star = String.fromCharCode(0x2605)
  // const bullet = String.fromCharCode(0x2022)
  // console.log(`user from review card`, user)

  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spot.id))
  } , [dispatch, spot.id])

  let xButton;

  // if (review.userId === user.id) {
  //   xButton = (
  //     <div className='name-delete'>
  //       <div>{review.User.firstName}</div>
  //       <div><DeleteReview review={review}/></div>
  //   </div>
  //   )
  // } else {
  //   xButton = (
  //     <div className='name-delete'>
  //       <div>{review.User.firstName}</div>
  //       <div>{null}</div>
  //     </div>
  //   )
  // }


  const cards = reviewsArray.map(review => {
    let dateString = review.createdAt;
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString('default', {month: 'long', year:'numeric'})
    // console.log(review)

    if (user === null) {
      xButton = (
        <div className='name-delete'>
          <div className='first-name'>{review.User?.firstName}</div>
          <div>{null}</div>
        </div>
      )
      } else if ( review.userId === user.id) {
        xButton = (
          <div className='name-delete'>
            <div className='first-name'>{review.User?.firstName}</div>
            <div className='edit-delete-rvw'>
              <div>
                <NavLink id='review-edit-btn' to={`/spots/${spot.id}/reviews/${review.id}/edit`}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </NavLink>
              </div>
              <DeleteReview review={review}/>
            </div>
        </div>
      )
      } else {
        xButton = (
          <div className='name-delete'>
            <div className='first-name'>{review.User.firstName}</div>
            <div>{null}</div>
          </div>
        )
      }


    return (
      <div className='review-card' key={review.id}>
        {xButton}
        <div className='rating-date'>
          {`${star} ${review.stars}`}

        </div>
        <div className='date'>{` ${formattedDate}`}</div>
        <div className='review'>{review.review}</div>
      </div>
    )
  })

  return (
    cards
  );
}

export default SpotReviewCards;
