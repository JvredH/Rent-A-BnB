import { Link } from "react-router-dom";

const SpotCards = ({spot}) => {
  // console.log('from spots card :', spot)
  return (
    <div className='spot-card-container'>
      <Link className='cards' to={`/spots/${spot.id}`}>
        <div >
          <img className='card-image' alt ='' src={spot.previewImage}/>
        </div>
        <div>
          <div className='location-and-rating'>
            <div>{`${spot.city}, ${spot.state}`}</div>
            <div>{spot.avgRating}</div>
          </div>
          <div>{`${spot.price}`}</div>
        </div>
      </Link>
    </div>
  )
}

export default SpotCards;
