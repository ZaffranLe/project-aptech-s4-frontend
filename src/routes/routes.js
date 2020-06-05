import React from "react";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { history } from "./history";
import FailAccess from "../components/fail-access/fail-access";
import OrderReceipt from "../pages/order-receipt/order-receipt";

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/admin-dashboard/order-receipt" render={() => <OrderReceipt />} />
                    <Route path="*" render={() => <FailAccess />} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;
