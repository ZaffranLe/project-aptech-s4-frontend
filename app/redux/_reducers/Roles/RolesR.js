import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    roles: [],
    isReload: false,
    isModified: false,
};

export const RolesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ROLE_GET_ALL_ROLE:
        case actionTypes.ROLE_CREATE_ROLE:
        case actionTypes.ROLE_UPDATE_ROLE:
        case actionTypes.ROLE_DELETE_ROLE:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.ROLE_GET_ALL_ROLE_SUCCEED:
            return {
                ...state,
                roles: action.data,
                isReload: false,
            };
        case actionTypes.ROLE_CREATE_ROLE_SUCCEED:
        case actionTypes.ROLE_UPDATE_ROLE_SUCCEED:
        case actionTypes.ROLE_DELETE_ROLE_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.ROLE_CREATE_ROLE_FAILED:
        case actionTypes.ROLE_UPDATE_ROLE_FAILED:
        case actionTypes.ROLE_DELETE_ROLE_FAILED:
        case actionTypes.ROLE_GET_ALL_ROLE_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
