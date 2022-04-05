const ADD_PICTURE = 'picture/ADD';

const addPicture = (picture) => ({
    type: ADD_PICTURE,
    picture
})

export const createPicture = (data) => async (dispatch) => {
    const response = await fetch('/api/picture', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "_csrf": `bgLWkA7tNOJzE7b0VUE-zrqc`
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const picture = await response.json();
        dispatch(addPicture(picture))
    }
}

const initialState = {
    list: []
};

const sortList = (list) => {
    return list
        .sort((A, B) => {
            return A.no - B.no;
        })
        .map((picture) => picture.id);
};

const pictureReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTURE: {
            if (!state[action.picture.id]) {
                const newState = {
                    ...state,
                    [action.picture.id]: action.picture
                };
                const pictureList = newState.list.map(id => newState[id]);
                pictureList.push(action.picture);
                newState.list = sortList(pictureList)
                return newState
            }
        }
        default:
            return state;

    }
}

export default pictureReducer