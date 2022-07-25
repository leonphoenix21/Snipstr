import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './PictureList.css';

const PictureList = () => {


    const [users, setUsers] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const [num, setNum] = useState(0);

    //Querrying for users and finding the user who uploaded this picture
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/all');
            const responseData = await response.json();
            setUsers(responseData);
        }
        fetchData();
    }, [dispatch]);

    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
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

export default PictureList;