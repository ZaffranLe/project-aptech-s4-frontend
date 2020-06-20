import { combineReducers } from "redux";
import { ProductsReducer } from "../_reducers/Products/ProductsR";
import { ProductTypesReducer } from "../_reducers/ProductTypes/ProductTypesR";
import { ManufacturersReducer } from "../_reducers/Manufacturers/ManufacturersR";
import { CustomersReducer } from "../_reducers/Customers/CustomersR";
import { ProvidersReducer } from "../_reducers/Providers/ProvidersR";
import { PostsReducer } from "../_reducers/Posts/PostsR";

const appReducers = combineReducers({
    ProductsReducer,
    ProductTypesReducer,
    ManufacturersReducer,
    CustomersReducer,
    ProvidersReducer,
    PostsReducer,
});

export default appReducers;
