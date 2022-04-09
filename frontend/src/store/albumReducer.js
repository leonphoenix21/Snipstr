import { csrfFetch } from './csrf';

const ADD_ONE = 'album/CREATE';
const LOAD_ALBUM = 'album/LOAD_';
const DELETE_ALBUM = 'album/ADD';
const EDIT_ALBUM = 'album/EDIT';

const loadAlbum = (album) => ({
    type: LOAD_ALBUM,
    album
});

const editAlbum = (album) => ({
    type: EDIT_ALBUM,
    album
});

const addAlbum = (album) => ({
    type: ADD_ONE,
    album
});

const deleteAlbum = (album) => ({
    type: DELETE_ALBUM,
    album
})

//! Create Albums in the DataBase
export const createAlbum = (data) => async (dispatch) => {
    console.log("datat", data)
    const response = await csrfFetch('/api/albums', {
        method: 'post',
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const album = await response.json();
        console.log('album', album)
        dispatch(addAlbum(album))
        return (album)
    }

}

//! Get Albums from the Database
export const getAlbums = () => async (dispatch) => {
    const response = await fetch('/api/albums');
    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAlbum(albums));
    }
};

//! Edit/Update Albums from the db
export const editAlbums = (data) => async (dispatch) => {
    const response = await csrfFetch(`api/albums/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    console.log("response", response.body)
    if (response.ok) {
        const album = await response.json();
        dispatch(editAlbum(album));
        return album;
    }
}

//!Delete Picture from the db
export const deleteAlbums = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/delete/${albumId}`, {
        method: 'delete'
    });
    if (response.ok) {
        await response.json();
        dispatch(deleteAlbum(albumId));
        return albumId
    }
};

const initialState = {
    list: []
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ONE: {
            if (!state[action.album.id]) {
                let newState = {
                    ...state,
                    [action.album.id]: action.album
                };
                const albumList = state.list.map(id => newState[id]);
                albumList.push(action.album);
                newState.list.push(albumList);
                return newState = {
                    ...newState,
                    ...state
                }
            }
        }
        case LOAD_ALBUM: {
            return { ...state, list: [...action.album] };
        }
        case DELETE_ALBUM: {
            let newState = { ...state };
            delete newState[action.albumId]
            return newState = {
                ...newState,
                ...state
            }
        }
        default:
            return state;
    }
}

export default albumReducer;