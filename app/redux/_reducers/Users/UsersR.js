import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    users: [],
    isReload: false,
    isModified: false,
    isLoading: false,
    roles: [],
};

export const UsersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.USER_GET_ALL_USER:
        case actionTypes.USER_CREATE_USER:
        case actionTypes.USER_UPDATE_USER:
        case actionTypes.USER_DELETE_USER:
        case actionTypes.ROLE_GET_ALL_ROLE:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.ROLE_GET_ALL_ROLE_SUCCEED:
            return {
                ...state,
                roles: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.USER_GET_ALL_USER_SUCCEED:
            return {
                ...state,
                users: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.USER_CREATE_USER_SUCCEED:
        case actionTypes.USER_UPDATE_USER_SUCCEED:
        case actionTypes.USER_DELETE_USER_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
                isLoading: false,
            };
        case actionTypes.USER_CREATE_USER_FAILED:
        case actionTypes.USER_UPDATE_USER_FAILED:
        case actionTypes.USER_DELETE_USER_FAILED:
        case actionTypes.USER_GET_ALL_USER_FAILED:
        case actionTypes.ROLE_GET_ALL_ROLE_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
