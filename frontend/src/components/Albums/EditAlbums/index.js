import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAlbums, deleteAlbums } from '../../../store/albumReducer';
import { useHistory, useParams } from 'react-router-dom';

const EditAlbumForm = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const album = useSelector(state => state.album.list)
    const { id } = useParams();

    const [name, setName] = useState(album.name);
    const [url, setUrl] = useState(album.url);
    const [user_id, setUser_id] = useState(user.id);


    //!Submit for the edit album fomr
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id,
            name,
            url,
            user_id
        }
        history.push('/albumlist')
        await dispatch(editAlbums(payload));
        console.log("payload", payload)
        reset();
    }

    const DeleteSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id
        }
        history.push('/albumlist')
        await dispatch(deleteAlbums(payload.id));
        reset();
    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/albumlist')
    };

    return (
        <div id='createPictureForm'>
            <form onSubmit={handleSubmit} id='EditAlbumForm'>
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
            <form onSubmit={DeleteSubmit} id='deleteAlbumForm'>
                <button
                    type='submit'>
                    Delete
                </button>
            </form>
        </div>
    )

}
export default EditAlbumForm;