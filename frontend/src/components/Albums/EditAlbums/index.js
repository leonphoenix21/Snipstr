import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAlbums, deleteAlbums } from '../../../store/albumReducer';
import { useHistory, useParams } from 'react-router-dom';
import './EditAlbum.css'
const EditAlbumForm = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const album = useSelector(state => state.album.list)
    const { id } = useParams();

    const [name, setName] = useState(album.name);
    const [url, setUrl] = useState(album.url);
    const [user_id, setUser_id] = useState(user.id);

    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.album.list);
    const pict = albums.filter(pic => pic.id === +id)
    const verify = pict.map(pic => pic.user_id === +sessionUser.id)

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
        history.push('/')
        await dispatch(deleteAlbums(payload.id));
        reset();
    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/')
    };

    return (
        <div id='createPictureForm'>
            {verify ?
                <>
                    <h1>Edit Album</h1>
                    <form onSubmit={handleSubmit} id='EditAlbumForm'>

                        <input
                            id='nameInput'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Rename album here'
                            name='name'
                            required
                        />
                        <input
                            type='text'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='Change Image url'
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
                </>
                : null}

        </div>
    )

}
export default EditAlbumForm;