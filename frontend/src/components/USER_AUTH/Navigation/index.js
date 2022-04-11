import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    sessionLinks = (
        <>
            <nav>
                <ul className='nav_links'>
                    <li key='1'><NavLink exact to="/home">Explore</NavLink></li>
                    <li key='2'><NavLink exact to="/all">Camera Roll</NavLink></li>
                    <li key='3'><NavLink exact to="/pictures"> Upload </NavLink></li>
                    <li key='4'><NavLink exact to="/albums"> Create Album </NavLink></li>
                    <li key='5'><NavLink exact to="/albumlist"> Album List </NavLink></li>
                    <li key='6'>
                        <div className='profile'>
                            <ProfileButton user={sessionUser} />
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
    return (
        <>
            {!sessionUser ?
                <header>
                    <nav >
                        <ul className='nav_links'>
                            <li><NavLink exact to="/"> Home </NavLink></li>
                            <li><NavLink to="/login">Log In</NavLink></li>
                            <li><NavLink to="/signup">Sign Up</NavLink></li>
                        </ul>
                    </nav>
                </header>
                : <>
                    {isLoaded && sessionLinks}
                </>
            }

        </>
    );
}

export default Navigation;