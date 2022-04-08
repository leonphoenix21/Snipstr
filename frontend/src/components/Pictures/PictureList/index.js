import { useState, useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './PictureList.css'
const PictureList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const [isShown, setIsShown] = useState({ visibility: 'hidden' });
    const [model, setModel] = useState(false);
    const [tempsrc, setTempSrc] = useState('');
    // const [nameId, setNameId] = useState('1')
    const getImg = (src) => {
        setTempSrc(src);
        setModel(true);
    }
    //!Date conversion
    // const getDate = (date) => {
    //     let newDate = new Intl.DateTimeFormat('en-US', {
    //         year: 'numeric', month: '2-digit',
    //         day: '2-digit'
    //     }).format(date)
    //     return newDate;
    // }

    // const newFormat = pictures.map(picture => {
    //     return getDate(picture.createdAt)
    // })


    const navLink = (id) => {
        history.push(`/picture/${id}`)

    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>
            <div className='HomePageImg'>
                <img src='https://live.staticflickr.com/65535/51986459249_ee5d51af98_h.jpg'
                    alt=''
                    className='HomePageImg'
                    style={{ width: '100%' }} />
            </div>
            <h1 id='pictureH1'> Explore </h1>
            <nav className='pictureNav'>
                <div><NavLink exact to="/albumlist"> Album List </NavLink> </div>
                <div> <NavLink exact to="/pictures"> Upload </NavLink> </div>
            </nav>
            <div className='gallery' >
                {pictures.map(picture => (
                    <>
                        <div className='pics' key={picture.id} >
                            <img
                                id='pictureImg'
                                placeholder={picture.name}
                                src={picture.url}
                                alt={picture.name}
                                style={{ width: '100%' }}
                            />
                            <div className='image-overlay'
                                onClick={() => navLink(picture.id)}
                            >
                                <div className='insideOverlay'>
                                    <div className='image-title'>{picture.name}  </div>
                                    <div className='image-date'> {picture.createdAt.slice(0, 10)}</div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )

}

export default PictureList;