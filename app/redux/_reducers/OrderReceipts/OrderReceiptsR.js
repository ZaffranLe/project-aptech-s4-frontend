import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    orderReceipts: [],
    isReload: false,
    isModified: false,
    isLoading: false,
    employees: [],
    products: [],
};

export const OrderReceiptsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT:
        case actionTypes.RECEIPT_CREATE_ORDER_RECEIPT:
        case actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT:
        case actionTypes.RECEIPT_DELETE_ORDER_RECEIPT:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT:
        case actionTypes.USER_GET_ALL_USER:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT_SUCCEED:
            return {
                ...state,
                orderReceipts: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.RECEIPT_CREATE_ORDER_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_DELETE_ORDER_RECEIPT_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
                isLoading: false,
            };
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_SUCCEED:
            return {
                ...state,
                isLoading: false,
                products: action.data,
            };
        case actionTypes.USER_GET_ALL_USER_SUCCEED:
            return {
                ...state,
                isLoading: false,
                employees: action.data,
            };
        case actionTypes.RECEIPT_CREATE_ORDER_RECEIPT_FAILED:
        case actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT_FAILED:
        case actionTypes.RECEIPT_DELETE_ORDER_RECEIPT_FAILED:
        case actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_FAILED:
        case actionTypes.USER_GET_ALL_USER_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
