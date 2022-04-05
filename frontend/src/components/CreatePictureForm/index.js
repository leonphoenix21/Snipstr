import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPicture } from '../../store/components/pictureReducer';

import './CreatePictureForm.css';

const UploadImage = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');
    const [album_id, setAlbum_id] = useState('');
    const [errors, setErrors] = useState([]);


    const dispatch = useDispatch();

    const handleSubmit = async (e) => {


        e.preventDefault();
        const newPicture = {
            name,
            url,
            user_id,
            album_id
        };

        const picture = await dispatch(createPicture(newPicture));

        if (picture) reset();
        else {
            console.log("Hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            console.log("Hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            console.log("This is submit Post", picture)
        }

    };



    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        setAlbum_id('')
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
                    name='title'
                />
                <input
                    type='text'
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    placeholder='Image URL'
                    name='imageUrl'
                />
                <input
                    type='hidden'
                    value={(e) => setUser_id(e.target.value)}
                    name='user_id'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default UploadImage;