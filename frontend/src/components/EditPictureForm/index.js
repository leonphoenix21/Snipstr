import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPicture } from '../../store/pictureReducer';


const EditPictureForm = ({ picture, hideForm, user }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(picture.name);
    const [url, setUrl] = useState(picture.url);
    const [user_id, setUser_id] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            url
        }
        const picture = await dispatch(editPicture(payload));
        if (picture) {
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <section>
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
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}