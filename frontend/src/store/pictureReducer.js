import { csrfFetch } from './csrf';

const ADD_PICTURE = 'picture/ADD';
const LOAD_PICTURES = 'picture/LOAD'

const addPicture = (picture) => ({
    type: ADD_PICTURE,
    picture
})


export const loadPictures = (picture) => {
    return {
        type: LOAD_PICTURES,
        picture
    };
};

// Create Pictures in the DataBase
export const createPicture = (data) => async (dispatch) => {
    const { name, url, user_id } = data
    const response = await csrfFetch('/api/picture', {
        method: 'post',
        body: JSON.stringify({
            name,
            url,
            user_id
        })
    });

    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture))
        return (picture)
    }


}

// Get Pictures from the Database
export const getPictures = () => async (dispatch) => {
    const response = await fetch('/api/picture');
    if (response.ok) {
        const pictures = await response.json();
        dispatch(loadPictures(pictures));
    }
};

const initialState = {
    list: []
};

// const sortList = (list) => {
//     return list
//         .sort((A, B) => {
//             return A.no - B.no;
//         })
//         .map((picture) => picture.id);
// };

const pictureReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PICTURE: {
            if (!state[action.picture.id]) {
                let newState = {
                    ...state,
                    [action.picture.id]: action.picture
                };
                const pictureList = state.list.map(id => newState[id]);
                pictureList.push(action.picture);
                newState.list.push(pictureList)
                // newState.list = sortList(pictureList)
                console.log('bbbbbbbbbbb', newState.list)
                return newState = {
                    ...newState,
                    ...state
                }
            }
        }
        case LOAD_PICTURES: {

            return { ...state, list: [...action.picture] };
            // let newState = {};
            // // console.log("naaaa", newState.list)
            // action.picture.forEach((picture) => {
            //     newState[picture.id] = picture;
            // });
            // newState.list.push(...newState)
            // console.log("naaaa", newState.list)

            // return {
            //     ...newState,
            //     ...state,
            // };
        }

        default:
            return state;

    }
}

export default pictureReducer