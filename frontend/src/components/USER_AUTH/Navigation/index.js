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
                <div className='pictureNav'>
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink exact to="/pictures"> Upload </NavLink>
                    <NavLink exact to="/albums"> Create Album </NavLink>
                    <NavLink exact to="/albumlist"> Album List </NavLink>
                    <div className='profileButton'>
                        <ProfileButton user={sessionUser} />
                    </div>
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div id='navbarLinks' className='pictureNav'>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <div>
            {!sessionUser ?
                <>
                    <div id='navbardiv' >
                        <NavLink exact to="/"> Home </NavLink>
                        <NavLink to="/login">Log In</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </div>

                </>
                : <div >
                    {isLoaded && sessionLinks}
                </div>
            }

        </div>
    );
}

export default Navigation;