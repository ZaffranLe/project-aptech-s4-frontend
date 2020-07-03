import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    posts: [],
    isReload: false,
    isModified: false,
};

export const PostsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.POST_GET_ALL_POST:
        case actionTypes.POST_CREATE_POST:
        case actionTypes.POST_UPDATE_POST:
        case actionTypes.POST_DELETE_POST:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.POST_GET_ALL_POST_SUCCEED:
            return {
                ...state,
                posts: action.data,
                isReload: false,
            };
        case actionTypes.POST_CREATE_POST_SUCCEED:
        case actionTypes.POST_UPDATE_POST_SUCCEED:
        case actionTypes.POST_DELETE_POST_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.POST_CREATE_POST_FAILED:
        case actionTypes.POST_UPDATE_POST_FAILED:
        case actionTypes.POST_DELETE_POST_FAILED:
        case actionTypes.POST_GET_ALL_POST_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
