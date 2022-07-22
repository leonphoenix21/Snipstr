import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './PictureList.css';

const PictureList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const [num, setNum] = useState(0);



    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>

            <p className='pictureH1'> Explore </p>
            <div className='gallery' >
                {pictures.map(picture => (
                    <>
                        <div className='pics' key={picture.id} >
                            <img
                                id='pictureImg'
                                placeholder={picture.name}
                                src={picture.url}
                                alt={picture.name}
                                style={{ width: '102%', height: '277px' }}
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