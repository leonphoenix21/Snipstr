import { useState, useEffect } from 'react';
// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { View, Text } from 'react';
import { getPictures } from '../../store/pictureReducer';
import './PictureList.css'
const PictureList = () => {
    let pictuer;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const [isShown, setIsShown] = useState({ visibility: 'hidden' });

    //!Date conversion
    const getDate = (date) => {
        let newDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit',
            day: '2-digit'
        }).format(date)
        return newDate;
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);
    // const userPictures

    return (
        <>
            <h1> Pictures </h1>
            {/* <thead> </thead> */}
            <div id='imgDiv'>
                {pictures.map(picture => (

                    <div id='all'>
                        {picture.name}
                        <div key={picture.id} id='NavDiv'>
                            <NavLink to={`/picture/${picture.id}`} id='imgNavlink'>
                                <img
                                    placeholder={picture.name}
                                    src={picture?.url}
                                    alt={picture?.name}
                                    width={550}
                                    height={350}
                                    onMouseOver={() => setIsShown({ visibility: '' })}
                                    onMouseLeave={() => setIsShown({ visibility: 'hidden' })}
                                />
                            </NavLink>

                        </div>
                        <div id='createdAt'
                            style={isShown}
                        >
                            {picture.createdAt}
                        </div>

                    </div>
                ))}

            </div>
        </>
    )
}

export default PictureList;