import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPicture } from '../../../store/pictureReducer';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import React, { CSSProperties } from 'react';

// import Select from 'react-select';

import './CreatePictureForm.css';

const UploadImage = ({ user }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');
    const albumArr = []
    const [album_id, setAlbum_id] = useState(null);
    const albums = useSelector(state => state.album.list);
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);



    //! Verification 
    const [albumState, setAlbumState] = useState(false)
    const albumSearch = albums.map(album => {
        const userAlbums = {}
        if (sessionUser.id === album.user_id) {
            albumArr.push(userAlbums[album.id] = album)
        }
    })
    console.log('this is user', albumArr)
    const handleSubmit = async (err) => {

        err.preventDefault();
        const newPicture = {
            name,
            url,
            user_id,
            album_id
        };
        console.log("BHBHBBHBH", newPicture)
        const picture = await dispatch(createPicture(newPicture));
        if (picture) {
            reset()
        }

    };

    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/')

    };

    const submitAlbum = (album) => {

    }

    return (
        <div className='inputBox' id='inputBox'>
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit} id='createPictureForm'>

                <input
                    id='nameInput'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Title'
                    name='name'
                    required
                />
                <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder='Image URL'
                    name='url'
                    required
                />
                <select className='container p5'
                    onChange={(e) => setAlbum_id(e.target.value)}
                >
                    <option style={{ display: 'block' }} value='null'>Select Album Here</option>
                    {albumArr?.map(album => (
                        <option value={album.id}
                        >{album.name}</option>

                    ))}
                </select>

                <button
                    onClick={(e) => (
                        setUser_id(user.id)
                    )}
                    type='submit'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UploadImage;