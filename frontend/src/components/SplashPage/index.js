import { useState, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


import './Splash.css';
import React from 'react';
const SplashPage = () => {
    const [num, setNum] = useState(0);
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const pics = [
        'https://live.staticflickr.com/65535/51987929062_d2dce274d2_k.jpg', //
        'https://live.staticflickr.com/65535/51993482155_39813c68a6_h.jpg',//
        'https://live.staticflickr.com/485/19884167574_5a04f376a9_k.jpg',
        'https://live.staticflickr.com/65535/52225316803_503203d050_6k.jpg',
        'https://live.staticflickr.com/65535/51995149873_eacf06dbcd_h.jpg',//
        'https://live.staticflickr.com/65535/51995045874_9a4720aa5b_h.jpg',//
        'https://live.staticflickr.com/65535/51994907696_4c775b4722_h.jpg',//
        'https://live.staticflickr.com/65535/51992167665_224056e6a3_3k.jpg',//
        'https://live.staticflickr.com/65535/51992697234_81ab64a8e6_h.jpg',
        'https://live.staticflickr.com/8520/29294676141_f78e97ed5c_6k.jpg',
        'https://live.staticflickr.com/4537/38467313156_9294fc3522_5k.jpg',
    ]


    useEffect(() => {
        const pictureInterval = setInterval(() => {
            setNum((prevNum) => (prevNum === 10 ? 0 : prevNum + 1));
        }, 6000);
        return () => pictureInterval;
    }, []);


    if (sessionUser) return (
        <Redirect to="/home" />
    );


    const signup = () => {
        history.push(`/signup`)
    }


    return (
        <div className='SplashBody'>
            <img src={pics[num]}
                alt=''
                className='SplashPageImg'
                style={{ width: '105%', height: '103%' }}
            />
            <div className="OverlayText">
                <div className="HeaderQuote">
                    Find Your Inspiration
                </div>
                <div className="introduceSnipstr">
                    Join the Snipstr community, home to tens of billions
                    of photos and 2 million groups.
                </div>
                <button className='splashBeginBtn' onClick={signup}>
                    Start for free
                </button>
            </div>

            <nav className='splashFooter'>

                <div className='devLinksTitle'> Developer Links: </div>
                <div className="linkIcons">
                    <a href='https://github.com/leonphoenix21' className='alinkImg'><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt='' className='gitImg' /> </a>
                    <a href='https://www.linkedin.com/in/noel-m-19145aa3/' className='alinkImg'> <img src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Icon-Logo.wine.svg" alt='' className='linkImg' /></a>
                </div>

            </nav>
        </div>
    )


}

export default SplashPage;