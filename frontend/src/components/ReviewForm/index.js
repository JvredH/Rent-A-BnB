import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createReviewThunk } from '../../store/reviewsReducer'
import { useHistory } from "react-router-dom";


const ReviewForm = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch()
  const history = useHistory();
  const [stars, setStars] = useState(1);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user)
  // console.log(user)

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([])
    // console.log('spotId======> ' , spotId)

    const newReview = {
      review,
      stars
    }

    const userInfo = { User: user }

    return await dispatch(createReviewThunk(newReview, userInfo, spotId))
      .then(() => history.push(`/spots/${spotId}`))
      .catch(
        async (res) => {
          const data = await res.json();
          if(data && data.errors) setErrors(data.errors)
        }
      )
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave a Review!</h2>
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
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
