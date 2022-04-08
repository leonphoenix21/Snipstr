import { csrfFetch } from './csrf';

const ADD_PICTURE = 'picture/ADD';
const LOAD_PICTURES = 'picture/LOAD';
const DELETE_PICTURE = 'picture/DELETE';

export const addPicture = (picture) => ({
    type: ADD_PICTURE,
    picture
})



export const loadPictures = (picture) => {
    return {
        type: LOAD_PICTURES,
        picture
    };
};

export const deletePic = (pictureId) => {
    return {
        type: DELETE_PICTURE,
        pictureId
    }
};

//! Create Pictures in the DataBase
export const createPicture = (data) => async (dispatch) => {
    const response = await csrfFetch('/api/picture', {
        method: 'post',
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture))
        return (picture)
    }

}

//! Get Pictures from the Database
export const getPictures = () => async (dispatch) => {
    const response = await fetch('/api/picture');
    if (response.ok) {
        const pictures = await response.json();
        dispatch(loadPictures(pictures));
    }
};




//! Edit/Update Pictures from the db
export const editPicture = (data) => async (dispatch) => {

    const response = await csrfFetch(`api/picture/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    console.log("response", response.body)
    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture));
        return picture;
    }
}

//!Delete Picture from the db
export const deletePicture = (pictureId) => async (dispatch) => {
    const response = await csrfFetch(`/api/picture/${pictureId}`, {
        method: 'delete'
    });
    if (response.ok) {
        await response.json();
        dispatch(deletePic(pictureId));
        return pictureId
    }
};

const initialState = {
    list: []
};
const pictureReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PICTURE:
            let newState = {
                ...state,
            };
            if (!state[action.picture.id]) {
                let newState = {
                    ...state,
                    [action.picture.id]: action.picture
                };
                const pictureList = state.list.map(id => newState[id]);
                pictureList.push(action.picture);
                newState.list.push(pictureList)
            }
            return newState = {
                ...newState,
                ...state
            }
        case LOAD_PICTURES: {
            return { ...state, list: [...action.picture] };
        }
        case DELETE_PICTURE: {
            let newState = { ...state };
            delete newState[action.pictureId]
            return newState = {
                ...newState,
                ...state
            }
        }
        default:
            return state;

    }
}

export default pictureReducer;