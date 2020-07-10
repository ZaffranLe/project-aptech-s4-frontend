import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    products: [],
    isLoading: false,
};

export const CartReducer = (state = defaultState, action) => {
    const products = [...state.products];
    switch (action.type) {
        case actionTypes.CART_ADD_PRODUCT:
            return {
                ...state,
                products: [...products, action.data],
            };
        case actionTypes.CART_REMOVE_PRODUCT:
            return {
                ...state,
                products: products.filter((product) => product["Product"]["Id"] != action.data),
            };
        case actionTypes.CART_CHANGE_QUANTITY:
            // eslint-disable-next-line no-case-declarations
            const idProduct = action.id;
            // eslint-disable-next-line no-case-declarations
            const buyingQuantity = action.buyingQuantity;
            // eslint-disable-next-line no-case-declarations
            const productToChange = products.find((product) => product["Product"]["Id"] == idProduct);
            productToChange["buyingQuantity"] = buyingQuantity;
            productToChange["totalPrice"] = productToChange["Product"]["UnitPrice"] * buyingQuantity;
            return {
                ...state,
                products,
            };
        case actionTypes.CART_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.CART_ORDER_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.CART_REFRESH_CART:
        case actionTypes.CART_ORDER_SUCCEED:
            return {
                ...state,
                products: [],
                isLoading: false,
            };
        default:
            return state;
    }
};
