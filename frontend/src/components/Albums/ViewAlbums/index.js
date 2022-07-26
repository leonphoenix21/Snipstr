import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import { getPictures } from '../../../store/pictureReducer';
import { useParams } from 'react-router-dom';
import './ViewAlbum.css'
import React from 'react';

const ViewAlbumList = () => {
    const { id } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.album.list);
    const userAlbums = albums.filter(album => album.user_id === +sessionUser.id)
    const pictures = useSelector(state => state.picture.list);
    const albumPictures = pictures.filter(picture => picture.album_id === +id)
    const alb = userAlbums.filter(album => album.id === +id)
    const verify = alb.map(pic => pic.user_id === +sessionUser.id)
    // const pictures = useSelector(state => state.picture.list);
    const picCount = (album_Id) => {
        const albumPictures = pictures.filter(picture => picture.album_id === album_Id)
        if (albumPictures.length === 1) return `${albumPictures.length} photo`
        return `${albumPictures.length} photos`
    }




    const navLink = (id) => {
        history.push(`/albums/${id}`)
    }




    useEffect(() => {
        dispatch(getAlbums());
        dispatch(getPictures());
    }, [dispatch]);
    return (
        <>
            <h6 className='pictureH1' style={{ marginLeft: "9%" }}>Albums</h6>
            <div className='albumgallery' >
                {userAlbums.map(album => (
                    <>
                        <div className='picsAlbum ' key={album.id} >
                            <img
                                id='pictureImg'
                                placeholder={album.name}
                                src={album.url}
                                alt={album.name}
                                style={{ width: '325px', height: '240px' }}

                            />
                            <div className="albumTitle">
                                <div className='imageTitle' style={{ marginLeft: '-5px', fontSize: '15px' }}>{album.name}</div>
                                <div className='imageName' style={{ marginLeft: '-3px', color: 'white', fontSize: '12px' }}>{picCount(album.id)} </div>
                            </div>
                            <div className='image-overlay'
                                style={{ width: '325px', height: '240px' }}
                                onClick={() => navLink(album.id)}
                            >
                                <div className='insideOverlay'>
                                    {/* <div className='image-title'>{album.name}  </div>
                                    <div className='image-created'>{album.createdAt.slice(0, 10)} </div> */}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>

    )
}

export default ViewAlbumList