import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    productTypes: [],
    isReload: false,
    pageLoading: false,
};

export const ProductTypesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE:
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE:
            return {
                ...state,
                pageLoading: true,
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                productTypes: action.data,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_SUCCEED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                isReload: true,
                pageLoading: false,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED:
            return {
                ...state,
                pageLoading: false,
            };
        default:
            return state;
    }
};
