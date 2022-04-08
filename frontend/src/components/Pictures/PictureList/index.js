import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPictures } from '../../../store/pictureReducer';
import './PictureList.css'
const PictureList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const [isShown, setIsShown] = useState({ visibility: 'hidden' });

    //!Date conversion
    // const getDate = (date) => {
    //     let newDate = new Intl.DateTimeFormat('en-US', {
    //         year: 'numeric', month: '2-digit',
    //         day: '2-digit'
    //     }).format(date)
    //     return newDate;
    // }

    // const newFormat = pictures.map(picture => {
    //     return getDate(picture.createdAt)
    // })



    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);


    return (
        <>
            <h1> Pictures </h1>
            <div id='imgDiv'>
                {pictures.map(picture => (
                    <div className='all'>
                        {picture.name}
                        <div key={picture.id} className='NavDiv'>
                            <NavLink to={`/picture/${picture.id}`} id='imgNavlink'>
                                <img
                                    placeholder={picture.name}
                                    src={picture?.url}
                                    alt={picture?.name}
                                />
                            </NavLink>
                        </div>
                        <div className='createdAt'>
                            {sessionUser.name} <>
                            </>
                            {picture.createdAt}
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default PictureList;