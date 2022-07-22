import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture, deletePicture } from '../../../store/pictureReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';


const EditPictureForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const picture = useSelector(state => state.picture.list)
    const albums = useSelector(state => state.album.list);
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(picture.name);
    const [url, setUrl] = useState(picture.url);
    const [user_id, setUser_id] = useState(sessionUser?.id);
    const [album_id, setAlbum_id] = useState('');
    const { id } = useParams();
    const albumArr = []


    //! Const above

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const pict = picture.filter(pic => pic.id === +id)
    const verify = pict.map(pic => pic.user_id === +sessionUser.id)


    const albumSearch = albums.map(album => {
        const userAlbums = {}
        if (sessionUser.id === album.user_id) {
            albumArr.push(userAlbums[album.id] = album)
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            name,
            url,
            user_id,
            album_id
        }
        history.push('/home')
        const pictures = await dispatch(editPicture(payload));
        if (pictures) {
            reset()
        }
    }
    const DeleteSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id
        }

        await dispatch(deletePicture(payload.id));
        reset();

    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        setAlbum_id('')
        history.push('/home')
    };


    return (
        <>

            {verify[0] ?
                <>

                    <h2> Edit  </h2>
                    <div id='EditPictureDiv' className='EditPictureForm'>
                        <div>
                            <form onSubmit={handleSubmit} >
                                <input
                                    className='field'
                                    id='nameInput'
                                    type='text'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    placeholder='rename here... '
                                    name='name'
                                    required
                                />
                                <input
                                    className='field'
                                    type='text'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder='change image url here...'
                                    name='url'
                                    required
                                />
                                <select
                                    onChange={(e) => setAlbum_id(e.target.value)}
                                    className='field'
                                >
                                    <option style={{ display: 'block' }} value='null' >album options</option>
                                    {albumArr?.map(album => (
                                        <option value={album.id}
                                            key={album.id}
                                        >
                                            {album.name}
                                        </option>

                                    ))}
                                </select>
                                <button
                                    id='btnfield'
                                    onClick={(e) => (
                                        setUser_id(sessionUser.id)
                                    )}
                                    type='submit'
                                    style={{ margin: '5px', width: '100px' }}>
                                    Submit
                                </button>
                            </form>
                            <form onSubmit={DeleteSubmit} id='deletePictureForm'>
                                <button
                                    style={{ margin: '5px', width: '100px' }}
                                    type='submit'>
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </>
                :
                null
            }
        </>
    )

}

export default EditPictureForm;