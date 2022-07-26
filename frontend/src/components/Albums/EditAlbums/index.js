import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAlbums, deleteAlbums } from '../../../store/albumReducer';
import { getPictures } from '../../../store/pictureReducer';
import { getAlbums } from '../../../store/albumReducer';
import { useHistory, useParams } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { AiTwotoneLike } from 'react-icons/ai';
import { AiTwotoneDislike } from 'react-icons/ai';
import { BsFillCaretRightFill } from 'react-icons/bs';

import Modal from 'react-modal';
import './EditAlbum.css';
import AlbumPictures from '../AlbumPictures';



const EditAlbumForm = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const albums = useSelector(state => state.album.list);
    const album = albums.filter(album => album.id === +id)
    const [name, setName] = useState(album[0]?.name);
    const [ShowConfirm, setShowConfirm] = useState(false);
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    const [url, setUrl] = useState(album[0]?.url);
    const [user_id, setUser_id] = useState(user.id);
    const pictures = useSelector(state => state.picture.list);
    const sessionUser = useSelector(state => state.session.user);
    const [showSlctImg, setShowSlctImg] = useState(true)
    const [showUploadImg, setShowUploadImg] = useState(false)
    const albumPictures = pictures.filter(picture => picture.album_id === +id)


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/all');
            const responseData = await response.json();
            setUsers(responseData);
        }
        fetchData();
    }, [dispatch]);


    const albumUserName = albums.map(album => {
        if (album.id === +id) {
            const user = users.filter(user => user.id === album.user_id)
            return `By: ${user[0]?.username}`
        }
    })

    const picCount = () => {
        const albumPictures = pictures.filter(picture => picture.album_id === +id)
        if (albumPictures.length === 1) return `${albumPictures.length} photo`
        return `${albumPictures.length} photos`
    }


    useEffect(() => {
        dispatch(getAlbums());
        dispatch(getPictures());
    }, [dispatch]);


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

    const submitNewPic = async (picture) => {
        const id = album[0].id
        const name = album[0].name
        const url = picture.url
        const user_id = picture.user_id

        const payload = {
            id,
            name,
            url,
            user_id
        }
        history.push('/albumlist')
        const editAlb = await dispatch(editAlbums(payload));
        if (editAlb.errors) {
            setErrors(editAlb.errors)
        }
    }

    const DeleteSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id
        }
        history.push('/home')
        await dispatch(deleteAlbums(payload.id));
        reset();
    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/home')
    };



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
            height: '650px',
            width: '820px'

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


    const backToAlbums = () => {
        history.push('/albumlist')
    }

    const SelectImages = () => {
        setShowSlctImg(true)
        setShowUploadImg(false)
    }
    const UploadImages = () => {
        setShowSlctImg(false)
        setShowUploadImg(true)
    }

    const previewUrl = 'https://www.preview.ph/preview-2.jpg';

    return (
        <>
            <div className="backToHome">
                <span onClick={backToAlbums} className='backToHomSpan'> <BsArrowLeft className='backArrow' /> Back To Albums list</span>
            </div>
            <div className='editalbumcontainer' >
                <img className="containerImg" src={`${album[0]?.url}`} />

                <div className='album-box'>
                    <div>

                        <h6 className='albDisplayName'>{album[0]?.name} </h6>
                        <div className="CollOfIdeas">
                            Collection Of Ideas
                        </div>
                        <div className='picCount' > {picCount()}</div>
                        <div className='byUser' > {albumUserName[0]}  </div>

                        < BiEdit onClick={openModal} className='editAlbumIcon opHov' />

                        < MdDeleteForever className='deleteIcon opHov' onClick={() => setShowConfirm(true)} />

                        {
                            ShowConfirm &&
                            <div className="ConfirmDel">
                                <BsFillCaretRightFill className='triConfirm' />
                                <p style={{ padding: '5px' }}> Confirm Delete </p>
                                <div className="confirmBtns">
                                    <button style={{ marginRight: '3px' }} className='cancelBtn opHov' onClick={() => setShowConfirm(false)}> Cancel <AiTwotoneDislike /> </button>
                                    <button onClick={DeleteSubmit} className='deleteBtn opHov'> Delete <AiTwotoneLike /> </button>
                                </div>
                            </div>
                        }
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="EditUser"
                        >
                            <div className="EditAlbModalCont">
                                <nav className="albOptionsNav">
                                    <div onClick={SelectImages}>
                                        Select Images
                                        {showSlctImg &&
                                            <div className="BlueBottom"></div>
                                        }
                                    </div>
                                    <div onClick={UploadImages}>
                                        Edit
                                        {showUploadImg &&
                                            <div className="BlueBottom"></div>
                                        }
                                    </div>

                                </nav>
                                <div className="albOptionDisplay">

                                    {showUploadImg &&
                                        <div className="showUploadImgDiv">

                                            <img src={url ? `${url}` : previewUrl} alt='' width='100%' height={420}
                                                className='albUpPrevImg'
                                                onError={(e) =>
                                                    e.target.src =
                                                    ('https://cdn.wallpapersafari.com/34/82/YRzXPk.jpeg')} />


                                            <form onSubmit={handleSubmit} className='EditAlbumForm'>
                                                <label className="urlLabel"> Album Name</label>
                                                <input
                                                    className='field'
                                                    type='text'
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    placeholder='rename'
                                                    name='name'
                                                    required
                                                />
                                                <label className="urlLabel"> Album Image Url</label>
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
                                                    id='submitAlbumForm'
                                                    className='editbtn'>
                                                    Submit
                                                </button>

                                            </form>
                                        </div>
                                    }

                                    <div className="showSlctDiv">
                                        {showSlctImg &&
                                            <>
                                                <div className='slctTitle'> Click on Image to Change Album Cover Picture </div>
                                                <div className='editAlbgallery ' >
                                                    {albumPictures.map(picture => (
                                                        < div key={picture.id} style={{ position: 'relative' }}>
                                                            <img
                                                                className='opHov'
                                                                placeholder={picture.name}
                                                                src={picture.url}
                                                                alt={picture.name}
                                                                style={{ width: '255px', height: '180px', position: 'relative' }}
                                                                onClick={() => submitNewPic(picture)}
                                                            />
                                                            <div className="modimgOverlay">
                                                                <div className='imageTitle'>{picture.name}  </div>
                                                                <div className='imageName' style={{ color: 'white' }}> {picture.createdAt.slice(0, 10)}</div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        }
                                    </div>

                                </div>

                            </div>
                        </Modal>
                        {/* <form onSubmit={DeleteSubmit} id='deleteAlbumForm'>
                        <button

                            type='submit'
                            className='editbtn'>
                            Delete
                        </button>
                    </form> */}
                    </div>
                </div>
            </div >
        </>
    )

}
export default EditAlbumForm;