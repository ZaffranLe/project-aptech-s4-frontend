import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    importReceipts: [],
    isReload: false,
    isModified: false,
};

export const ImportReceiptsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT:
            return {
                ...state,
                isModified: false,
            };
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_SUCCEED:
            return {
                ...state,
                importReceipts: action.data,
                isReload: false,
            };
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_SUCCEED:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
            };
        case actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_FAILED:
        case actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};
