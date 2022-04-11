import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAlbums, deleteAlbums } from '../../../store/albumReducer';
import { getAlbums } from '../../../store/albumReducer';
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
        <div className='editalbumcontainer'>
            <div className='album-box'>
                <div>

                    <h2 className='h2class'>edit</h2>
                    <form onSubmit={handleSubmit} className='createAlbumForm'>
                        <input
                            className='field'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='rename'
                            name='name'
                            required
                        />
                        <input
                            className='field'
                            type='text'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='change image url'
                            name='url'
                            required
                        />

                        <button
                            onClick={(e) => (
                                setUser_id(user.id)
                            )}
                            type='submit'
                            className='btn'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default EditAlbumForm;