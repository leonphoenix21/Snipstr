import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture, deletePicture } from '../../../store/pictureReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import './EditPictureForm.css';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import React from 'react';


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
        if (!pictures.errors) {
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


    Modal.ariaHideApp = false


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row',
            height: '500px',
            width: '420px'

        },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'black';
    }

    function closeModal() {
        setIsOpen(false);
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

    const isImage = (url) => {
        if (!url) return 'https://www.preview.ph/preview-2.jpg';
        else if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)) {
            return url
        } else {
            return 'https://cdn.wallpapersafari.com/34/82/YRzXPk.jpeg'
        }
    }


    return (
        <>

            {verify[0] ?
                <>
                    < FiEdit onClick={openModal} className='editOpenIcon' />

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="EditUser"
                    >

                        <form onSubmit={handleSubmit} >

                            <span onClick={closeModal} className='editCloseIcon' >< AiOutlineCloseCircle /></span>

                            <h2 > Edit Picture Details </h2>

                            <div className="previewImg">
                                <img src={`${url}`} alt="" height={220} width={380}
                                    onError={(e) =>
                                        e.target.src =
                                        ('https://cdn.wallpapersafari.com/34/82/YRzXPk.jpeg')}
                                />
                            </div>
                            <div className="fieldDiv">
                                <label> title </label>
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
                            </div>
                            <div className="fieldDiv">
                                <label>image Url</label>
                                <input
                                    className='field'
                                    type='text'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    // placeholder='change image url here...'
                                    name='url'
                                    required
                                />
                            </div>
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
                                style={{ marginLeft: '55px' }}
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
                                type='button'>
                                Delete
                            </button>
                        </form>
                    </Modal>
                </>
                :
                null
            }
        </>
    )

}

export default EditPictureForm;