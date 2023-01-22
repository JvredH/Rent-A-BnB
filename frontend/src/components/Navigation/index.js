import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './../../images/rent-a-bnb-logo.png'
// import OpenModalButton from '../OpenModalButton/index'
// import CreateSpot from '../SpotsForms/CreateSpot';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let session;

  if (!sessionUser) {
    session = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    )
  } else {
    session = (
      <div className='right-nav-container'>
        <div>
          <Link to='/spots/new'><button className='create-spot-button'>rent-a-bnb your home</button></Link>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    )
  }

  return (
    <div className='nav-container'>
      <div className='top-nav'>
        <div>
          <NavLink exact to="/"><img src={logo}/></NavLink>
          {/* <img src='./rent-a-bnb-logo.png' alt=''/> */}
        </div>
        {isLoaded && (
          session
          // <div>
          //   <div>
          //     <Link to='/spots/new'>Create Spot</Link> {/* delete this link, list and parent div, for testing purposes */}
          //   </div>
          //   <div>
          //     <ProfileButton user={sessionUser} />
          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
