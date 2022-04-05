const LOAD_PICTURES = 'picture/loadPicture';
const ADD_PICTURE = 'picture/addPicture';
const LOAD = 'picture/LOAD';

const loadPicture = (picture) => ({
    type: LOAD,
    picture
});

export const loadPictures = (pictures) => {
    return {
        type: LOAD_PICTURES,
        pictures
    };
};

export const addPicture = (picture) => {
    return {
        type: ADD_PICTURE,
        picture
    };
};

export const fetchPictures = () => async (dispatch) => {
    const response = await fetch('/api/pictures');
    const pictures = await response.json();
    dispatch(loadPictures(pictures));
};

export const createPicture = (payload) => async (dispatch) => {
    const response = await fetch('/api/pictures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture));
        return picture;
    }
};

export const updatePicture = (data) => async (dispatch) => {
    const response = await fetch(`/api/picture/${data.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture));
        // return picture;
    }
};

const initialState = { entries: [], isLoading: true };
const sortList = (list) => {
    return list
        .sort((pictureA, pictureB) => {
            return pictureA.no - pictureB.no;
        })
        .map((picture) => picture.id);
};

const pictureReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allPictures = {};
            action.list.forEach((picture) => {
                allPictures[picture.id] = picture;
            });
            return {
                ...allPictures,
                ...state,
                list: sortList(action.list)
            };
        }
        case LOAD_PICTURES:
            return { ...state, entries: [...action.articles] };
        case ADD_PICTURE:
            return { ...state, entries: [...state.entries, action.article] };
        default:
            return state;
    }
};

export default pictureReducer;