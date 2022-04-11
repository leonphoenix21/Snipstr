import { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import { getPictures } from '../../../store/pictureReducer';
import './AlbumPictures.css';

const AlbumPictures = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const pictures = useSelector(state => state.picture.list);
    const albumPictures = pictures.filter(picture => picture.album_id === +id)
    const albums = useSelector(state => state.album.list);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const displayName = [];
    const albumName = albums.map(album => {
        if (album.id === +id) displayName.push(album.name)
    })


    const navLink = (id) => {
        history.push(`/picture/${id}`)
    }

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch]);

    return (
        <>
            <h2 className='h3class'> {displayName[0]} </h2>
            <div className='gallery' >
                {albumPictures.map(picture => (
                    <>
                        <div className='pics' key={picture.id} >
                            <img
                                id='pictureImg'
                                placeholder={picture.name}
                                src={picture.url}
                                alt={picture.name}
                                style={{ width: '100%' }}
                            />
                            <div className='image-overlay'
                                onClick={() => navLink(picture.id)}
                            >
                                <div className='insideOverlay'>
                                    <div className='image-title'>{picture.name}  </div>
                                    <div className='image-createdAt'> {picture.createdAt.slice(0, 10)}</div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )

}

export default AlbumPictures;