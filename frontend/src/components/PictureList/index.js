import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getPictures } from '../../store/pictureReducer';
import './PictureList.css'

const PictureList = () => {
    const dispatch = useDispatch();
    const pictures = useSelector(state => state.picture.list)
    console.log("haaaaaaaaaaaaa", pictures)
    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>
            <h1> Pictures </h1>
            {/* <thead> </thead> */}
            <div id='container'>
                {pictures.map(picture => (
                    <div key={picture.id} id='imgDiv'>
                        {picture.name}
                        {/* <NavLink to={`/picture/${picture.id}`}> {picture.name} </NavLink> */}

                        {if picture.url}
                        <img
                            src={picture?.url}
                            alt={picture?.name}
                            width={550}
                            height={350}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default PictureList;