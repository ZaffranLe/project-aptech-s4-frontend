import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    productTypes: [],
    isReload: false,
    isModified: false,
    isLoading: false,
};

export const ProductTypesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE:
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                productTypes: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
                isLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
