import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    permissions: [],
    isReload: false,
    isModified: false,
};

export const PermissionsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PERMISSION_GET_ALL_PERMISSION:
        case actionTypes.PERMISSION_CREATE_PERMISSION:
        case actionTypes.PERMISSION_UPDATE_PERMISSION:
        case actionTypes.PERMISSION_DELETE_PERMISSION:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.PERMISSION_GET_ALL_PERMISSION_SUCCEED:
            return {
                ...state,
                permissions: action.data,
                isReload: false,
            };
        case actionTypes.PERMISSION_CREATE_PERMISSION_SUCCEED:
        case actionTypes.PERMISSION_UPDATE_PERMISSION_SUCCEED:
        case actionTypes.PERMISSION_DELETE_PERMISSION_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.PERMISSION_CREATE_PERMISSION_FAILED:
        case actionTypes.PERMISSION_UPDATE_PERMISSION_FAILED:
        case actionTypes.PERMISSION_DELETE_PERMISSION_FAILED:
        case actionTypes.PERMISSION_GET_ALL_PERMISSION_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
