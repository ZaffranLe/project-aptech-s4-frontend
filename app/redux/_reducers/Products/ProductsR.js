import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    isReload: false,
    manufacturers: [],
    productTypes: [],
};

export const ProductsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_ALL_PRODUCT:
            return {
                ...state,
                isReload: true,
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
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER:
        case actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED:
        default:
            return state;
    }
};
