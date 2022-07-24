import React from 'react';
import Modal from 'react-modal';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPictures } from '../../../store/pictureReducer';
import EditPictureForm from '../EditPictureForm';
import { useEffect, useState } from 'react';

import './SinglePicture.css';




const SinglePicture = () => {


    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    const pictures = useSelector(state => state.picture.list)
    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);
    const { id } = useParams();
    const singlePicture = pictures.find(picture => picture.id === +id)
    //Querrying for users and finding the user who uploaded this picture
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/all');
            const responseData = await response.json();
            setUsers(responseData);
        }
        fetchData();
    }, [dispatch]);

    const findUser = users?.filter(currUser => currUser?.id === +singlePicture?.user_id);
    const user = findUser[0]


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
            flexDirection: 'row'

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


    return (
        <div className='singlePicBody'>

            <div className='singlePicBcgrnd'>
                <img
                    src={singlePicture?.url}
                    alt={singlePicture?.name}
                    height='80%'
                    id='imgsingle'
                />

                <div className='editFormSingleDiv' ><EditPictureForm /></div>
            </div>
            <div className="picInfoContainer">
                <h2>{singlePicture?.name} </h2>
                <div>{user?.username}</div>
            </div>

        </div>
    )

}
export default SinglePicture;