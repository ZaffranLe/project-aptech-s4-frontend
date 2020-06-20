import { combineReducers } from "redux";
import { ProductsReducer } from "../_reducers/Products/ProductsR";
import { ProductTypesReducer } from "../_reducers/ProductTypes/ProductTypesR";
import { ManufacturersReducer } from "../_reducers/Manufacturers/ManufacturersR";

const appReducers = combineReducers({
    ProductsReducer,
    ProductTypesReducer,
    ManufacturersReducer,
});

export default appReducers;
