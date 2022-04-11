import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../../store/albumReducer';
import { useParams } from 'react-router-dom';
import './ViewAlbum.css'

const ViewAlbumList = () => {
    const { id } = useParams();
    const history = useHistory();

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

    const navLink = (id) => {
        history.push(`/albums/${id}`)
    }


    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);
    return (
        <>
            <h2 className='h3class'>Albums</h2>
            <div className='albumgallery' >
                {userAlbums.map(album => (
                    <>
                        <div className='pics picsAll ' key={album.id} >
                            <img
                                id='pictureImg'
                                placeholder={album.name}
                                src={album.url}
                                alt={album.name}
                                style={{ width: '100%', height: '300px' }}

                            />
                            <div className='image-overlay'
                                onClick={() => navLink(album.id)}
                            >
                                <div className='insideOverlay'>
                                    <div className='image-title'>{album.name}  </div>
                                    <div className='image-created'>{album.createdAt.slice(0, 10)} </div>
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