import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture, deletePicture } from '../../../store/pictureReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';


const EditPictureForm = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const picture = useSelector(state => state.picture.list)
    const albums = useSelector(state => state.album.list);
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(picture.name);
    const [url, setUrl] = useState(picture.url);
    const [user_id, setUser_id] = useState(user.id);
    const [album_id, setAlbum_id] = useState('');
    const { id } = useParams();
    const albumArr = []


    //! Const above

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const pict = picture.filter(pic => pic.id === +id)
    const verify = pict.map(pic => pic.user_id === +sessionUser.id)
    console.log("this is verify", verify)
    // console.log("this is picture, ", pict)
    // console.log("this is creator ", isCreator, 'this is sessionUser', sessionUser)

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
        history.push('/')
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
        console.log("payload", payload.id)
        await dispatch(deletePicture(payload.id));
        reset();

    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/')
        setAlbum_id('')
    };


    return (
        <div id='EditPictureDiv'>
            {verify[0] ?
                <>
                    <form onSubmit={handleSubmit} className='EditPictureForm'>
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
                            <option style={{ display: 'block' }} value='null' >Select Album Here</option>
                            {albumArr?.map(album => (
                                <option value={album.id}
                                    key={album.id}
                                >
                                    {album.name}
                                </option>

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
                    <form onSubmit={DeleteSubmit} id='deletePictureForm'>
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

export default EditPictureForm;