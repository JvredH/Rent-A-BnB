import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import OpenModalButton from '../OpenModalButton/index'
// import CreateSpot from '../SpotsForms/CreateSpot';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // let session;

  // if (!sessionUser) {
  //   session = (
  //     <ProfileButton user={sessionUser} />
  //   )
  // } else {
  //   session = (
  //     <div>
  //       <OpenModalButton
  //         buttonText="Create Spot"
  //         modalComponent={<CreateSpot />}
  //         />
  //       <ProfileButton user={sessionUser} />
  //     </div>
  //   )
  // }

  return (
    <ul className='top-nav'>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        // session
        <div>
          <li>
            <Link to='/spots/new'>Create Spot</Link> {/* delete this link, list and parent div, for testing purposes */}
          </li>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}

export default Navigation;
