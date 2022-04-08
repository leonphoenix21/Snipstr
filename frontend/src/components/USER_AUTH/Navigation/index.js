import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NavLink exact to="/pictures"> Upload </NavLink>
                <NavLink exact to="/albums"> Create Album </NavLink>
                <NavLink exact to="/albumlist"> Album List </NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div id='navbarLinks'>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <div id='navbardiv'>
            <NavLink exact to="/">Home</NavLink>

            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;