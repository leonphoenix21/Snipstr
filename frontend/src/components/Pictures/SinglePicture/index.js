import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPictures } from '../../../store/pictureReducer';
import EditPictureForm from '../EditPictureForm';
import { useEffect, useState } from 'react';


import './SinglePicture.css';
import React from 'react';




const SinglePicture = () => {
    // console.log("aaaaa", user)
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    const pictures = useSelector(state => state.picture.list)
    // console.log("aaaaa", pictures)
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

    // const findUser = users?.filter(currUser => currUser?.id === +id);
    // const user = findUser[0]

    return (
        <div className='singlePicBody'>
            <img
                src={singlePicture?.url}
                alt={singlePicture?.name}
                height='80%'
                id='imgsingle'
            />
            {/* <div className="picInfoContainer">
                <h2>{singlePicture?.name} </h2>
                <div>{singlePicture?.name}</div>
            </div> */}
            <EditPictureForm />
        </div>
    )

}
export default SinglePicture;