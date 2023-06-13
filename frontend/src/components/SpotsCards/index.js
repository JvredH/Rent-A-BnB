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
          <img className='card-image' alt='' src={spot.previewImage} onError={(e) => { e.target.onerror = null; e.target.src = 'https://a0.muscache.com/im/pictures/7a6cd22c-6db5-4c25-abe4-4948e89b2c3d.jpg?im_w=1200' }} />
        </div>
        <div>
          <div className='location-and-rating'>
            <div className='city-state-container'>{`${spot.city}, ${spot.state}`}</div>
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
