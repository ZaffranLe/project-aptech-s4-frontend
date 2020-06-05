import React from "react";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { history } from "./history";
import FailAccess from "../components/fail-access/fail-access";

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="*" render={() => <FailAccess />} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;
