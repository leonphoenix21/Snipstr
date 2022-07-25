import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAlbum } from '../../../store/albumReducer';
import { useHistory } from 'react-router-dom';
import './CreateAlbumForm.css';

const CreateAlbumForm = ({ user }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [user_id, setUser_id] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (err) => {

        err.preventDefault();
        const newAlbum = {
            name,
            url,
            user_id
        };

        const album = await dispatch(createAlbum(newAlbum));
        if (album) {
            reset()
        }

    };
    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/albumlist')
    };

    const previewUrl = 'https://www.preview.ph/preview-2.jpg';

    return (
        <div className='albumcontainer'>
            <h2 className='createAlbumh2'>Create A New Album</h2>
            <div className='albumpicture-box'>
                <div className="leftAlbum">
                    <img src={url ? `${url}` : previewUrl} alt='' width='100%'
                        onError={(e) =>
                            e.target.src =
                            ('https://cdn.wallpapersafari.com/34/82/YRzXPk.jpeg')} />
                </div>
                <div className='right'>
                    <form onSubmit={handleSubmit} className='createAlbumForm'>
                        <label className="urlLabel"> Album Name</label>
                        <input
                            className='field'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='name'
                            name='name'
                            required
                        />

                        <label className="urlLabel"> Album Image Url</label>

                        <input
                            className='field'
                            type='text'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='image url'
                            name='url'
                            required
                        />

                        <button
                            onClick={(e) => (
                                setUser_id(user.id)
                            )}
                            type='submit'
                            className='btn'>
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAlbumForm