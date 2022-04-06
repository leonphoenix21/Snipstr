import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPicture } from '../../store/pictureReducer';
import { useHistory } from 'react-router-dom';

import './CreatePictureForm.css';

const UploadImage = ({ user }) => {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');
    // const [album_id, setAlbum_id] = useState('');



    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (err) => {

        err.preventDefault();
        const newPicture = {
            name,
            url,
            user_id
            // album_id
        };
        console.log(newPicture)
        const picture = await dispatch(createPicture(newPicture));
        if (picture) {
            reset()
            history.push(`/${user_id}`);
        }

    };



    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');

        // setAlbum_id('')
    };

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