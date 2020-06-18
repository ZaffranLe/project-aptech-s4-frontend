import { combineReducers } from "redux";
import { ProductsReducer } from "../_reducers/Products/ProductsR";
import { ProductTypesReducer } from "../_reducers/ProductTypes/ProductTypesR";

const appReducers = combineReducers({
    ProductsReducer,
    ProductTypesReducer
});

export default appReducers;
