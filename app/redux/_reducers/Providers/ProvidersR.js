import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    providers: [],
    isReload: false,
    isModified: false,
};

export const ProvidersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PROVIDER_GET_ALL_PROVIDER:
        case actionTypes.PROVIDER_CREATE_PROVIDER:
        case actionTypes.PROVIDER_UPDATE_PROVIDER:
        case actionTypes.PROVIDER_DELETE_PROVIDER:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.PROVIDER_GET_ALL_PROVIDER_SUCCEED:
            return {
                ...state,
                providers: action.data,
                isReload: false,
            };
        case actionTypes.PROVIDER_CREATE_PROVIDER_SUCCEED:
        case actionTypes.PROVIDER_UPDATE_PROVIDER_SUCCEED:
        case actionTypes.PROVIDER_DELETE_PROVIDER_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.PROVIDER_CREATE_PROVIDER_FAILED:
        case actionTypes.PROVIDER_UPDATE_PROVIDER_FAILED:
        case actionTypes.PROVIDER_DELETE_PROVIDER_FAILED:
        case actionTypes.PROVIDER_GET_ALL_PROVIDER_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
