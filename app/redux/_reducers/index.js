import { combineReducers } from "redux";
import { ProductsReducer } from "../_reducers/Products/ProductsR";
import { ProductTypesReducer } from "../_reducers/ProductTypes/ProductTypesR";
import { ManufacturersReducer } from "../_reducers/Manufacturers/ManufacturersR";
import { CustomersReducer } from "../_reducers/Customers/CustomersR";
import { PermissionsReducer } from "../_reducers/Permissions/PermissionsR";
import { RolesReducer } from "../_reducers/Roles/RolesR";
import { ProvidersReducer } from "../_reducers/Providers/ProvidersR";
import { PostsReducer } from "../_reducers/Posts/PostsR";
import { RegisterReducer } from "../_reducers/Register/RegisterR";
import { NavbarReducer } from "../_reducers/Navbar/NavbarR";
import { ImportReceiptsReducer } from "../_reducers/ImportReceipts/ImportReceiptsR";
import { LoginReducer } from "../_reducers/Login/LoginR";
import { UsersReducer } from "../_reducers/Users/UsersR";

const appReducers = combineReducers({
    ProductsReducer,
    ProductTypesReducer,
    ManufacturersReducer,
    CustomersReducer,
    PermissionsReducer,
    RolesReducer,
    ProvidersReducer,
    PostsReducer,
    RegisterReducer,
    NavbarReducer,
    ImportReceiptsReducer,
    LoginReducer,
    UsersReducer,
});

export default appReducers;
