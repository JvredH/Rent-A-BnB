import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from './components/SpotsDetails/index'
import CreateSpot from "./components/SpotsForms/CreateSpot";
import EditSpot from "./components/SpotsForms/EditSpot";
import ReviewForm from "./components/ReviewForm";
import UsersBookings from "./components/Bookings/UsersBookings";
import UsersSpots from "./components/UsersSpots";
import EditReviews from "./components/SpotReviews/EditReviews";
import ErrorPage from "./components/Error";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <Spots />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spots/:spotId/reviews/new'>
            <ReviewForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route path='/spots/:spotId/reviews/:reviewId/edit'>
            <EditReviews />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route path='/users/:userId/spots'>
            <UsersSpots />
          </Route>
          <Route path='/users/:userId/trips'>
            <UsersBookings />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
