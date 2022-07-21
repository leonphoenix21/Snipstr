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



    const pics = [
        'https://live.staticflickr.com/65535/51989383731_79940e0b6a_h.jpg',
        'https://live.staticflickr.com/65535/51987929062_d2dce274d2_k.jpg', //
        'https://live.staticflickr.com/65535/51992697234_81ab64a8e6_h.jpg',
        'https://live.staticflickr.com/65535/51995149873_eacf06dbcd_h.jpg',//
        'https://live.staticflickr.com/65535/51995045874_9a4720aa5b_h.jpg',//
        'https://live.staticflickr.com/65535/51994907696_4c775b4722_h.jpg',//
        'https://live.staticflickr.com/65535/51992167665_224056e6a3_3k.jpg'//
    ]



    useEffect(() => {
        const pictureInterval = setInterval(() => {
            setNum((prevNum) => (prevNum === 6 ? 0 : prevNum + 1));
        }, 5000);
        return () => pictureInterval;
    }, []);


    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>
            <div className='HomePageImage'>
                <img src={pics[num]}
                    alt=''
                    className='HomePageImage'
                    style={{ width: '100%' }}
                />
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