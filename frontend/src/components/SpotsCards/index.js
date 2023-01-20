import { Link } from "react-router-dom";

const SpotCards = ({spot}) => {
  // console.log('from spots card :', spot)
  const star = String.fromCharCode(0x2605)

  return (
    <div className='spot-card-container'>
      <Link className='cards' to={`/spots/${spot.id}`}>
        <div >
          <img className='card-image' alt ='' src={spot.previewImage}/>
        </div>
        <div>
          <div className='location-and-rating'>
            <div>{`${spot.city}, ${spot.state}`}</div>
            <div>{`${star} ${spot.avgRating}`}</div>
          </div>
          <div>{`$${spot.price} night`}</div>
        </div>
      </Link>
    </div>
  )
}

export default SpotCards;
