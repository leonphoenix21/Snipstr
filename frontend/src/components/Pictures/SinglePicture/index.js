import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPictures } from '../../../store/pictureReducer';
import { useEffect } from 'react';


import './SinglePicture.css';

const SinglePicture = ({ user }) => {
    // console.log("aaaaa", user)
    const dispatch = useDispatch();
    const pictures = useSelector(state => state.picture.list)
    // console.log("aaaaa", pictures)
    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);
    const { id } = useParams();
    const singlePicture = pictures.find(picture => picture.id === +id)

    return (
        <div>
            <h2>{singlePicture?.name} </h2>
            <img
                src={singlePicture?.url}
                alt={singlePicture?.name}
                width={550}
                height={350}
                id='imgsingle'
            />
        </div>
    )

}
export default SinglePicture;