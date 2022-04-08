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
        console.log("newAlbum", newAlbum)
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
    return (
        <div className='AlbumDiv'>
            <h1>Create Album</h1>
            <form onSubmit={handleSubmit} className='createAlbumForm'>
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
    )
}

export default CreateAlbumForm