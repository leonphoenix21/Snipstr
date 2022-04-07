import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import CreatePictureForm from './components/CreatePictureForm'
import SinglePicture from "./components/SinglePicture";
import PictureList from "./components/PictureList";
import EditPictureForm from "./components/EditPictureForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const pictures = useSelector(state => state.picture)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          {sessionUser ?
            <Route
              exact path={"/pictures"}>
              <CreatePictureForm user={sessionUser} />
            </Route> : // or statement
            <Route >
              <LoginFormPage />
            </Route>
          }
          <Route exact path={'/'}>
            <PictureList />
          </Route>
          <Route path='/picture/:id'>
            <SinglePicture user={sessionUser} />
            <EditPictureForm user={sessionUser} />
          </Route>
          <Route>
            <h1> Page Not Found</h1>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;