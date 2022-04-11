import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { Route } from 'react-router-dom';
import LoginFormPage from "../LoginFormPage";
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
        <>
            <div className="profile-dropdown">
                <ul>
                    <li onClick={openMenu}><a> Account </a>
                        {showMenu && (
                            <div className="sub-menu-1">
                                <ul>
                                    <li id='usernameLI'>{user.username}</li>
                                    <li id='emailLI'> {user.email}</li>
                                    <li id='buttonLI'>
                                        <button onClick={logout}>Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileButton;

























