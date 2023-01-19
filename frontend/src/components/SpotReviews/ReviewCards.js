
const ReviewCards = ({spot, reviews, star}) => {
  const array = Object.values(reviews)
  console.log('from review cards', array)

  const data = array.map(review => {
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
    data
  );
}

export default ReviewCards;
