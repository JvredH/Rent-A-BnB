import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk } from "../../store/reviewsReducer";
// import { useEffect } from "react";
// import { getOneSpotThunk } from "../../store/spotsReducer";

const DeleteReview = ({review}) => {
  const dispatch = useDispatch();
  const reviewId = review.id;
  // const spotId = review.spotId
  // console.log('from DELETE BUTTON' , review)

  // const reviews = useSelector(state => state.reviews)

  const handleDelete = () => {
    dispatch(deleteReviewThunk(reviewId))
  }

  return (
    <button onClick={handleDelete} className='x-button'><i class="fa-solid fa-trash icon"></i></button>
  )
}

export default DeleteReview
