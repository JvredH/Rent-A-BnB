import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
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
          <Link to='/spots/new'>Create Spot</Link>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    )
  }

  return (
    <div className='top-nav'>
      <div>
        <NavLink exact to="/">Home</NavLink>
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
  );
}

export default Navigation;
