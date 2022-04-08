import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture, deletePicture } from '../../../store/pictureReducer';
import { useHistory, useParams } from 'react-router-dom';

const EditPictureForm = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const picture = useSelector(state => state.picture.list)
    const { id } = useParams();
    console.log("idddddd", id)
    const [name, setName] = useState(picture.name);
    const [url, setUrl] = useState(picture.url);
    const [user_id, setUser_id] = useState(user.id);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            name,
            url,
            user_id
        }
        history.push('/')
        const pictures = await dispatch(editPicture(payload));
        if (pictures) {
            reset()
        }
    }
    const DeleteSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id
        }
        console.log("payload", payload.id)
        await dispatch(deletePicture(payload.id));
        reset();

    }


    const reset = () => {
        setName('');
        setUrl('');
        setUser_id('');
        history.push('/')
        // setAlbum_id('')
    };


    return (
        <div id='createPictureForm'>
            <form onSubmit={handleSubmit} id='createPictureForm'>
                <input
                    id='nameInput'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Title'
                    name='name'
                    required
                />
                <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder='Image URL'
                    name='url'
                    required
                />
                <button
                    onClick={(e) => (
                        setUser_id(user.id)
                    )}
                    type='submit'>
                    Submit
                </button>
            </form>
            <form onSubmit={DeleteSubmit} id='deletePictureForm'>
                <button
                    type='submit'>
                    Delete
                </button>
            </form>
        </div>
    )

}

export default EditPictureForm;