import { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './UserPictures.css';

const UserPictureList = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const UserPictures = pictures.filter(picture => picture.user_id === sessionUser.id);

    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/all');
            const responseData = await response.json();
            setUsers(responseData);
        }
        fetchData();
    }, [dispatch]);



    const PicUserName = (id) => {
        const userName = users.filter(user => {
            if (user.id === +id) {
                return user.username
            }
        })
        return `${userName[0]?.username}`
    }

    return (
        <>
            {/* <div className='HomePageImage'>
                <img src='https://live.staticflickr.com/65535/51986459249_ee5d51af98_h.jpg'
                    alt=''
                    className='HomePageImage'
                    style={{ width: '100%' }}
                />
            </div> */}
            <h1 className='pictureH1'> Camera Roll </h1>
            <div className='gallery' >
                {UserPictures.map(picture => (
                    <>
                        <div className='pics' key={picture.id} >
                            <img
                                id='pictureImg'
                                placeholder={picture.name}
                                src={picture.url}
                                alt={picture.name}
                                style={{ width: '102%' }}
                            />
                            <div className='image-overlay'
                                onClick={() => navLink(picture.id)}
                            >
                                <div className='insideOverlay'>
                                    <div className='imageTitle'>{picture.name}  </div>
                                    <div className='imageName'>  by <span style={{ textTransform: 'capitalize' }}>{PicUserName(picture.user_id)}</span>  </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )

}

export default UserPictureList;