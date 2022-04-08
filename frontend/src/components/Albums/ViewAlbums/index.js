import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import './ViewAlbum.css'

const ViewAlbumList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.album.list);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);
    return (
        <>
            <h1> albums </h1>
            <div id='imgDiv'>
                {albums.map(album => (
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