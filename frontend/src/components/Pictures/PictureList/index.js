import { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './PictureList.css';

const PictureList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);

    const pics = [
        { 1: 'https://live.staticflickr.com/65535/51989383731_79940e0b6a_h.jpg' },
        { 2: 'https://live.staticflickr.com/65535/51987929062_d2dce274d2_k.jpg' },
        { 3: 'key' },
        { 4: 'key' },
        { 5: 'key' },
        { 6: 'key' },

    ]
    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>
            <div className='HomePageImage'>
                <img src='https://live.staticflickr.com/65535/51986459249_ee5d51af98_h.jpg'
                    alt=''
                    className='HomePageImage'
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