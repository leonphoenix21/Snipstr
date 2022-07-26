import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { BsDot } from 'react-icons/bs'
import { HiSearch } from "react-icons/hi";
import { FaCloud } from "react-icons/fa";
import { ImArrowUp } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";

function Navigation({ isLoaded }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [searchInput, setSearchInput] = useState('');
    const [resultDisplay, setResultDisplay] = useState(false);
    const pictures = useSelector(state => state.picture.list);

    let sessionLinks;

    const CheckSeachBar = () => {
        if (searchInput.length) {
            setResultDisplay(true);
        } else {
            setResultDisplay(false);
        }
    };


    const Results = pictures?.filter(picture => {
        if (searchInput.length === 1) {
            if (picture?.name.toLowerCase().includes(searchInput.toLowerCase())
            ) return picture
        }

        if (searchInput.length === 2) {
            if (picture?.name.toLowerCase().includes(searchInput.toLowerCase())) return picture
        }
        else if (searchInput.length === 3) {
            if (picture?.name.toLowerCase().includes(searchInput.toLowerCase())) return picture
        } else if (searchInput.length > 0) {
            if (picture?.name.toLowerCase().includes(searchInput.toLowerCase())) return picture
        }
        // return 'no results'
    })





    const gotohome = () => {
        history.push('/home')
    }

    const splashpage = () => {
        history.push('/')
    }
    sessionLinks = (
        <>
            <nav className='sessionNavbar'>

                <div className='sessionLogoDots opHov' onClick={gotohome}>
                    <BsDot className='redDot' />
                    <BsDot className='blueDot' />
                    <span className='logoName' > Snipstr </span>
                </div>

                <NavLink className='upCloud opHov' exact to="/pictures"> < FaCloud className='maincloud' /> <ImArrowUp className='mainarrcloud' /> </NavLink>


                <div className="sessionSearchBarDiv" >
                    <input
                        className='searchInputSession'
                        value={searchInput}
                        maxLength={55}
                        placeholder='         Photos, people, or groups'
                        onChange={(e) => (CheckSeachBar(), setSearchInput(e.target.value))}
                    />
                    {!searchInput && <span className="searchInputIcon"><HiSearch /></span>}

                    {searchInput &&
                        <div className="sessionResultDisplayDiv">
                            <div className="Topresults">
                                {
                                    Results.length > 0 ?
                                        <>
                                            <div className='resultSearchhdr'> Top Results </div>
                                            {Results?.map(picture => (
                                                <a href={`/picture/${picture.id}/`} style={{ textDecoration: 'none', color: 'black' }}>
                                                    <div className='eachResultDiv'>
                                                        <img src={picture?.url} alt='' height={25} width={25} />
                                                        <span className='eachVidTitle'> {picture.name}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </>
                                        :
                                        <>
                                            <div className='resultSearchhdr'> No Results </div>
                                        </>
                                }

                            </div>

                        </div>
                    }
                </div>
                <div className='profile'>
                    <ProfileButton user={sessionUser} />
                </div>
            </nav>
        </>
    );

    const login = () => {
        history.push('/login')
    }
    const signup = () => {
        history.push('/signup')
    }

    return (
        <>
            {!sessionUser ?
                <nav className='navbar'>

                    <div className='logoDots opHov' onClick={splashpage}>
                        <BsDot className='redDot' />
                        <BsDot className='blueDot' />
                        <span className='logoName' > Snipstr </span>
                    </div>

                    <div className="NavBarBtnsDiv">
                        <button className='loginNavBtn opHov' onClick={login} >Log In</button>
                        <button className='signupNavBtn opHov' onClick={signup} > Sign Up</button>
                    </div>

                    <div className="searchBarDiv">
                        <input
                            className='searchInput'
                            value={searchInput}
                            maxLength={55}
                            placeholder='         Photos, people, or groups'
                            onChange={(e) => (CheckSeachBar(), setSearchInput(e.target.value))}
                        />
                        {!searchInput && <span className="searchInputIcon"><HiSearch /></span>}
                        {searchInput &&
                            <div className="resultDisplayDiv">
                                <div className="Topresults">
                                    <div className='resultSearchhdr'> Top Results </div>
                                    {Results?.map(picture => (
                                        <a href={`/picture/${picture.id}/`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <div className='eachResultDiv'>
                                                <img src={picture?.url} alt='' height={20} width={20} />
                                                <span className='eachVidTitle'> {picture.name}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                            </div>
                        }
                    </div>
                </nav>
                : <>
                    {isLoaded && sessionLinks}
                </>
            }

        </>
    );
}

export default Navigation;