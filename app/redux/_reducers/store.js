import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducers from "./index";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['CartReducer', "LoginReducer"]
}
const pReducer = persistReducer(persistConfig, appReducers);

export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);