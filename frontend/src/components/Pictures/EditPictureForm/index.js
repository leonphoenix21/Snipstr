import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture, deletePicture } from '../../../store/pictureReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import './EditPictureForm.css';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';


const EditPictureForm = () => {


    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const pictures = useSelector(state => state.picture.list)
    const picture = pictures.filter(pic => pic?.id === +id)
    console.log('kdsklskd', picture)
    const albums = useSelector(state => state.album.list);
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(picture[0]?.name);
    const [showEdit, setShowEdit] = useState(false);
    const [url, setUrl] = useState(picture[0]?.url);
    const [user_id, setUser_id] = useState(sessionUser?.id);
    const [album_id, setAlbum_id] = useState('');
    const albumArr = []


    //! Const above

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const pict = pictures.filter(pic => pic.id === +id)
    const verify = pict.map(pic => pic.user_id === +sessionUser?.id)


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

    const showButton = () => {
        setShowEdit(true)
    }
    const closeButton = () => {
        setShowEdit(false)
    }


    return (
        <>

            {verify[0] ?
                <>
                    <a href='#EditHeading'>
                        < FiEdit onClick={() => showButton()} className='editOpenIcon' />
                    </a>

                    {
                        showEdit &&
                        <>
                            <div id='EditPictureDiv' className='EditPictureForm'>
                                <div>
                                    <form onSubmit={handleSubmit} >

                                        <span onClick={() => closeButton()} className='editCloseIcon' >< AiOutlineCloseCircle /></span>

                                        <h2 id='EditHeading'> Edit  </h2>
                                        <input
                                            className='field'
                                            id='nameInput'
                                            type='text'
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            // placeholder='rename here... '
                                            name='name'
                                            required
                                        />
                                        <input
                                            className='field'
                                            type='text'
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            // placeholder='change image url here...'
                                            name='url'
                                            required
                                        />
                                        <select
                                            onChange={(e) => setAlbum_id(e.target.value)}
                                            className='field'
                                        >
                                            <option style={{ display: 'block' }} value='null' > add to album </option>
                                            {albumArr?.map(album => (
                                                <option value={album.id}
                                                    key={album.id}
                                                >
                                                    {album.name}
                                                </option>

                                            ))}
                                        </select>
                                        <button
                                            className='btns'
                                            onClick={(e) => (
                                                setUser_id(sessionUser.id)
                                            )}
                                            type='submit'
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={DeleteSubmit}
                                            className='btns'
                                            type='submit'>
                                            Delete
                                        </button>
                                    </form>
                                    {/* <form onSubmit={DeleteSubmit} id='deletePictureForm'>
                                        <button
                                            className='btns'
                                            type='submit'>
                                            Delete
                                        </button>
                                    </form> */}
                                </div>
                            </div>
                        </>
                    }
                </>
                :
                null
            }
        </>
    )

}

export default EditPictureForm;