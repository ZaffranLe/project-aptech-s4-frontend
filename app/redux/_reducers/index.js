import { combineReducers } from "redux";
import { ProductsReducer } from "../_reducers/Products/ProductsR";
import { ProductTypesReducer } from "../_reducers/ProductTypes/ProductTypesR";
import { ManufacturersReducer } from "../_reducers/Manufacturers/ManufacturersR";
import { CustomersReducer } from "../_reducers/Customers/CustomersR";

const appReducers = combineReducers({
    ProductsReducer,
    ProductTypesReducer,
    ManufacturersReducer,
    CustomersReducer,
});

export default appReducers;
