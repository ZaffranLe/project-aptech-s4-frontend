import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    isReload: false,
    manufacturers: [],
    productTypes: [],
    isCreatedSucceed: false,
    isLoading: false,
    isUpdatedSucceed: false,
};

export const ProductsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_ALL_PRODUCT:
            return {
                ...state,
                isCreatedSucceed: false,
                isUpdatedSucceed: false,
                isLoading: true,
            };
        case actionTypes.PRODUCT_DELETE_PRODUCT:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.PRODUCT_UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: true,
                isUpdatedSucceed: false,
            };
        case actionTypes.PRODUCT_DELETE_PRODUCT_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isReload: true,
            };
        case actionTypes.PRODUCT_UPDATE_PRODUCT_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isReload: true,
                isUpdatedSucceed: true,
            };
        case actionTypes.PRODUCT_DELETE_PRODUCT_FAILED:
        case actionTypes.PRODUCT_CREATE_PRODUCT_FAILED:
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER:
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_SUCCEED:
            return {
                ...state,
                products: action.data,
                isReload: false,
            };
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_SUCCEED:
            return {
                ...state,
                manufacturers: action.data,
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_SUCCEED:
            return {
                ...state,
                productTypes: action.data,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT:
            return {
                ...state,
                isCreatedSucceed: false,
                isLoading: true,
            };
        case actionTypes.PRODUCT_CREATE_PRODUCT_SUCCEED:
            return {
                ...state,
                isCreatedSucceed: true,
                isReload: true,
                isLoading: false,
            };
        default:
            return state;
    }
};
