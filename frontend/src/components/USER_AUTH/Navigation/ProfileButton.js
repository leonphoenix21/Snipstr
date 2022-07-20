import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { Route, NavLink } from 'react-router-dom';
import LoginFormPage from "../LoginFormPage";
import { FaUserCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";

import './Profilebtn.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    const closeMenu = () => {
        setTimeout(() => {
            setShowMenu(false)
        }, 1500)
    }
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        <Route >
            <LoginFormPage />
        </Route>
    };

    return (

        <div className="dropdown">

            <div className='userProfileUploadIcon' onClick={openMenu}> <FaUserCircle /> </div>
            {showMenu && (

                <div className="profile-dropdown">
                    <BsFillTriangleFill className="dropdownTriangle" />
                    <div className='lidrop-downDiv'>

                        <div className='username-down' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <span className='username-span'> Hello, {user.username}!</span>
                            <div className='dropdownWelcome' > Welcome to your page check the options below. </div>
                        </div>
                        <NavLink className='lidrop-down' to={`/all`} exact={true} activeClassName="active">
                            Camera Roll
                        </NavLink>
                        <NavLink className='lidrop-down' to={`/albums`} exact={true} activeClassName="active">
                            Create Album
                        </NavLink>
                        <NavLink className='lidrop-down' to={`/albumlist`} exact={true} activeClassName="active">
                            Albums
                        </NavLink>
                        <div onClick={logout} className='lidrop-down' style={{ marginBottom: '5px' }}>
                            Log Out
                        </div>
                    </div>

                </div>

            )}
        </div >

    );
}

export default ProfileButton;

























