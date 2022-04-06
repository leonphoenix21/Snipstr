import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import ApplicationPage from './components/CreatePictureForm'
// import Picture from '../../backend/db/models';
import SinglePicture from "./components/SinglePicture";
import PictureList from "./components/PictureList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          {sessionUser ?
            <Route
              path={["/", "/pictures", "/picture/:picture_id"]}>
              <ApplicationPage user={sessionUser} />
              <PictureList />
              <SinglePicture user={sessionUser} />
            </Route> : // or statement
            <Route >
              <LoginFormPage />
            </Route>
          }
        </Switch>
      )}
    </>
  );
}

export default App;