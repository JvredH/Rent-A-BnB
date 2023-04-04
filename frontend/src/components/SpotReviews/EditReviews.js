import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReviewThunk, loadSpotReviewsThunk } from "../../store/reviewsReducer";

const EditReviews = () => {
  let {spotId, reviewId} = useParams();
  const history = useHistory()
  const dispatch = useDispatch();
  const reviewState = useSelector(state => state.reviews[reviewId])

  const [stars, setStars] = useState(reviewState?.stars)
  const [review, setReview] = useState(reviewState?.review)
  const [errors, setErrors] = useState([])


  // useEffect(() => {
  //   dispatch(loadSpotReviewsThunk(spotId))
  // }, [dispatch, spotId])

  const handleSubmit = async e => {
    e.preventDefault();

    const newReviewData = {
      stars,
      review
    }

    return await dispatch(editReviewThunk(newReviewData, +reviewId))
      .then(() => history.push(`/spots/${spotId}`))
      .catch(
        async (res) => {
          const data = await res.json();
          if(data && data.errors) setErrors(data.errors)
          if (data && data.messages) setErrors(data.messages)
        }
      )
  }


  return (
    <div className='review-form-container'>
      <form onSubmit={handleSubmit} className='review-form'>
        <h2>Edit Review!</h2>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Stars
          <input
          type='number'
          value={stars}
          onChange={(e) => setStars(e.target.value)}/>
        </label>
        <label>
          Review
          <input
          type='text'
          value={review}
          onChange={(e) => setReview(e.target.value)}/>
        </label>
        <button type='submit'>
          Edit Review
        </button>
      </form>
    </div>
  );
}

export default EditReviews;
