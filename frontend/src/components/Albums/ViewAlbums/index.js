import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import { useParams } from 'react-router-dom';
import './ViewAlbum.css'

const ViewAlbumList = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.album.list);
    const userAlbums = albums.filter(album => album.user_id === +sessionUser.id)
    // console.log("this is user Albums", sessionUser.id, albums)
    const alb = userAlbums.filter(album => album.id === +id)
    const verify = alb.map(pic => pic.user_id === +sessionUser.id)
    console.log("this is alb", verify, alb)
    console.log("this is userALbums", userAlbums)
    console.log("this is user", sessionUser)




    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);
    return (
        <>
            <h1> albums </h1>
            <div id='imgDiv'>
                {userAlbums.map(album => (
                    <div className='all'>
                        {album.name}
                        <div key={album.id} className='NavDiv'>
                            <NavLink to={`/albums/${album.id}`} id='imgNavlink'>
                                <img
                                    placeholder={album.name}
                                    src={album.url}
                                    alt={album.name}
                                />
                            </NavLink>
                        </div>
                        <div className='createdAt'>
                            {sessionUser.name} <>
                            </>
                            {album.createdAt}
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ViewAlbumList