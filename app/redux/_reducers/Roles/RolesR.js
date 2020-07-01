import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    roles: [],
    permissions: [],
    isReload: false,
    isModified: false,
    isLoading: false,
};

export const RolesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ROLE_GET_ALL_ROLE:
        case actionTypes.PERMISSION_GET_ALL_PERMISSION:
        case actionTypes.ROLE_CREATE_ROLE:
        case actionTypes.ROLE_UPDATE_ROLE:
        case actionTypes.ROLE_DELETE_ROLE:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.PERMISSION_GET_ALL_PERMISSION_SUCCEED:
            return {
                ...state,
                permissions: action.data,
                isLoading: false,
            };
        case actionTypes.ROLE_GET_ALL_ROLE_SUCCEED:
            return {
                ...state,
                roles: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.ROLE_CREATE_ROLE_SUCCEED:
        case actionTypes.ROLE_UPDATE_ROLE_SUCCEED:
        case actionTypes.ROLE_DELETE_ROLE_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
                isLoading: false,
            };
        case actionTypes.ROLE_CREATE_ROLE_FAILED:
        case actionTypes.ROLE_UPDATE_ROLE_FAILED:
        case actionTypes.ROLE_DELETE_ROLE_FAILED:
        case actionTypes.ROLE_GET_ALL_ROLE_FAILED:
        case actionTypes.PERMISSION_GET_ALL_PERMISSION_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
