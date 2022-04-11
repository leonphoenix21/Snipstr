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
        <div className='albumcontainer'>
            <div className='albumpicture-box'>
                <div>
                    <h2>new album</h2>
                    <form onSubmit={handleSubmit} className='createAlbumForm'>
                        <input
                            className='field'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='name'
                            name='name'
                            required
                        />
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