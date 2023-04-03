import { Link } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
import './spotsCards.css'
// import DeleteSpot from "../SpotsDetails/DeleteSpot";

const SpotCards = ({spot,userId}) => {
  const star = String.fromCharCode(0x2605)

  // const crudBtns = (
  //   <div>
  //     <NavLink to={`/spots/${spot.id}/edit`}>Edit</NavLink>
  //     <DeleteSpot spot={spot}/> // type out crud here urself.
  //   </div>
  // )

  // console.log(userId)

  return (
    <div className='spot-card-container'>
      <Link className='cards' to={`/spots/${spot.id}`}>
        <div >
          <img className='card-image' alt='' src={spot.previewImage} onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg' }} />
        </div>
        <div>
          <div className='location-and-rating'>
            <div>{`${spot.city}, ${spot.state}`}</div>
            <div className='rating'>{`${star} ${spot.avgRating}`}</div>
          </div>
          <div className='spot-night-crud'>
            <div className='price'>{`$${spot.price}`}<span className='night'> night</span></div>
            {/* {+userId === spot.ownerId && crudBtns} */}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SpotCards;
