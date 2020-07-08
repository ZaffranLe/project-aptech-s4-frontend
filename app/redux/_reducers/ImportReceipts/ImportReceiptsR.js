import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    importReceipts: [],
    isReload: false,
    isModified: false,
    isLoading: false,
    employees: [],
    providers: [],
    products: [],
};

export const ImportReceiptsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT:
        case actionTypes.USER_GET_ALL_USER:
        case actionTypes.PROVIDER_GET_ALL_PROVIDER:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_SUCCEED:
            return {
                ...state,
                importReceipts: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_SUCCEED:
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
            }
        case actionTypes.USER_GET_ALL_USER_SUCCEED:
            return {
                ...state,
                isLoading: false,
                employees: action.data,
            }
        case actionTypes.PROVIDER_GET_ALL_PROVIDER_SUCCEED:
            return {
                ...state,
                isLoading: false,
                providers: action.data,
            }
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_FAILED:
        case actionTypes.PRODUCT_GET_ALL_PRODUCT_FAILED:
        case actionTypes.USER_GET_ALL_USER_FAILED:
        case actionTypes.PROVIDER_GET_ALL_PROVIDER_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
