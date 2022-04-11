import { useState, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


import './Splash.css';
const SplashPage = () => {
    const [num, setNum] = useState(0);
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const pics = [
        'https://live.staticflickr.com/65535/51989383731_79940e0b6a_h.jpg',
        'https://live.staticflickr.com/65535/51987929062_d2dce274d2_k.jpg',
        'https://live.staticflickr.com/65535/51992697234_81ab64a8e6_h.jpg',
        'https://live.staticflickr.com/65535/51993338052_b5a056d5e0_h.jpg',
        'https://live.staticflickr.com/65535/51994864440_5d40a38f7b_b.jpg',
        'https://live.staticflickr.com/65535/51993482155_39813c68a6_h.jpg',
    ]
    useEffect(() => {
        const pictureInterval = setInterval(() => {
            setNum((prevNum) => (prevNum === 5 ? 0 : prevNum + 1));
        }, 10000);
        return () => pictureInterval;
    }, []);


    if (sessionUser) return (
        <Redirect to="/home" />
    );

    const navLink = () => {
        if (sessionUser) {
            history.push(`/signup`)
        }
        else {
            history.push(`/signup`)
        }
    }

    return (
        <body>
            <div className='splashcontainer'>
                <div className='HomePageImage'>
                    <img src={pics[num]}
                        alt=''
                        className='HomePageImage'
                        style={{ width: '100%' }}
                    />
                </div>
                <div className='splashpicture-box'>
                    <div className='right'>

                    </div>
                    <h2> Welcome to Snipstr </h2>
                    <div id='splashtext'>
                        A place to share how you see the world
                    </div>
                    <button
                        onClick={() => navLink()}
                        className='splashbtn'>
                        Click To Begin
                    </button>


                </div>

            </div>
        </body >

    )


}

export default SplashPage;