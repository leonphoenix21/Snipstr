import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/USER_AUTH/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/USER_AUTH/Navigation"
import LoginFormPage from "./components/USER_AUTH/LoginFormPage";
import CreatePictureForm from './components/Pictures/CreatePictureForm'
import SinglePicture from "./components/Pictures/SinglePicture";
import PictureList from "./components/Pictures/PictureList";
import EditPictureForm from "./components/Pictures/EditPictureForm";
import CreateAlbumForm from "./components/Albums/CreateAlbums";
import ViewAlbumList from "./components/Albums/ViewAlbums";
import EditAlbumForm from "./components/Albums/EditAlbums";
import AlbumPictures from "./components/Albums/AlbumPictures";
import UserPictureList from "./components/Pictures/UserPictures";
import SplashPage from "./components/SplashPage";
import { getPictures } from "./store/pictureReducer";



//!                      ^^
//! FUNCTION STARTS HERE :: IMPORTS ABOVE
//!        ::            ::         
//!        <>               
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => (setIsLoaded(true), getPictures()));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

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
            <Route exact path={"/pictures"}>
              <CreatePictureForm user={sessionUser} />
            </Route> : // or statement
            <Route >
              <SplashPage />
            </Route>
          }
          {sessionUser ? <Route exact path={['/home', '/']} >
            <PictureList />
          </Route> : <Route path={'/'}>
            <SplashPage />
          </Route>}
          <Route exact path='/all'>
            <UserPictureList />
          </Route>
          <Route path='/picture/:id'>
            <SinglePicture />
            {/* <EditPictureForm user={sessionUser} /> */}
          </Route>
          <Route path='/albumlist'>
            <ViewAlbumList user={sessionUser} />
          </Route>
          <Route path='/albums/:id'>
            <EditAlbumForm user={sessionUser} />
            <AlbumPictures user={sessionUser} />
          </Route>
          {sessionUser ?
            <Route exact path={"/albums"}>
              <CreateAlbumForm user={sessionUser} />
            </Route> : // or statement
            <Route >
              <SplashPage />
            </Route>
          }
          <Route>
            <h1> Page Not Found</h1>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;