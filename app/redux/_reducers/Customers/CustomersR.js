import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    customers: [],
    isReload: false,
    isModified: false,
    isLoading: false,
};

export const CustomersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_GET_ALL_CUSTOMER:
        case actionTypes.CUSTOMER_CREATE_CUSTOMER:
        case actionTypes.CUSTOMER_UPDATE_CUSTOMER:
        case actionTypes.CUSTOMER_DELETE_CUSTOMER:
            return {
                ...state,
                isModified: false,
                isLoading: true,
            };
        case actionTypes.CUSTOMER_GET_ALL_CUSTOMER_SUCCEED:
            return {
                ...state,
                customers: action.data,
                isReload: false,
                isLoading: false,
            };
        case actionTypes.CUSTOMER_CREATE_CUSTOMER_SUCCEED:
        case actionTypes.CUSTOMER_UPDATE_CUSTOMER_SUCCEED:
        case actionTypes.CUSTOMER_DELETE_CUSTOMER_SUCCEED:
            return {
                ...state,
                isReload: true,
                isModified: true,
                isLoading: false,
            };
        case actionTypes.CUSTOMER_CREATE_CUSTOMER_FAILED:
        case actionTypes.CUSTOMER_UPDATE_CUSTOMER_FAILED:
        case actionTypes.CUSTOMER_DELETE_CUSTOMER_FAILED:
        case actionTypes.CUSTOMER_GET_ALL_CUSTOMER_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
