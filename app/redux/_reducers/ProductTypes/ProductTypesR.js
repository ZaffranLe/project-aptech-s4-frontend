import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    productTypes: [],
    isReload: false,
    isModified: false,
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
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                productTypes: action.data,
                isReload: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
