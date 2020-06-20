import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    manufacturers: [],
    isReload: false,
    isModified: false,
};

export const ManufacturersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER:
        case actionTypes.MANUFACTURER_CREATE_MANUFACTURER:
        case actionTypes.MANUFACTURER_UPDATE_MANUFACTURER:
        case actionTypes.MANUFACTURER_DELETE_MANUFACTURER:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_SUCCEED:
            return {
                ...state,
                manufacturers: action.data,
                isReload: false,
            };
        case actionTypes.MANUFACTURER_CREATE_MANUFACTURER_SUCCEED:
        case actionTypes.MANUFACTURER_UPDATE_MANUFACTURER_SUCCEED:
        case actionTypes.MANUFACTURER_DELETE_MANUFACTURER_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.MANUFACTURER_CREATE_MANUFACTURER_FAILED:
        case actionTypes.MANUFACTURER_UPDATE_MANUFACTURER_FAILED:
        case actionTypes.MANUFACTURER_DELETE_MANUFACTURER_FAILED:
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};