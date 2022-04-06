import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getPictures } from '../../store/pictureReducer';
import SinglePicture from '../SinglePicture/index'
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
                        {/* {picture.name} */}
                        <NavLink to={`/picture/${picture.id}`} id='imgNavlink'>
                            {picture?.name}
                            <img
                                src={picture?.url}
                                alt={picture?.name}
                                width={550}
                                height={350}
                                id='img'
                            />
                            <div id='editImgDiv'>
                                <form>
                                    <button id='editPicturebtn' >
                                        Edit
                                    </button>
                                </form>
                            </div>
                        </NavLink>
                        <Switch>
                            <Route path='/picture/:id'>
                                {/* <SinglePicture pictures={pictures} /> */}
                            </Route>
                        </Switch>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PictureList;