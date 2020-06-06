import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./../../layout/default";
import { RoutedContent } from "./../../routes";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/_reducers/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/lib/integration/react";
import { history } from "../../routes/history";

const basePath = process.env.BASE_PATH || "/";

const AppClient = () => {
    return (
        <Router history={history} basename={basePath}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppLayout>
                        <RoutedContent />
                    </AppLayout>
                </PersistGate>
            </Provider>
            <ToastContainer 
                    position={"top-right"}
                    autoClose={5000}
                    draggable={false}
                    hideProgressBar={false}
                />
        </Router>
    );
};

export default hot(module)(AppClient);
