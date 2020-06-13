import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    isReload: false
}

export const ProductsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_GET_ALL_PRODUCT:
            return {
                ...state,
                isReload: true
            }
        default:
            return state;
    }
}