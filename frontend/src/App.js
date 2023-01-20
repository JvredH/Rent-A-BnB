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
          <Route path='/spots/new'> {/* delete this later, for testing purposes*/}
            <CreateSpot />
          </Route>
          <Route path='/spots/:spotId/reviews/new'>
            <ReviewForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
