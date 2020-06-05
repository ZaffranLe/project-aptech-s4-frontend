import React from "react";
import { Grid, Segment, Menu, Button, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FailAccess from "../fail-access/fail-access";

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App" id="header">
                <Menu inverted fluid color="brown" fixed="top">
                    <Menu.Item>
                        <Button inverted icon="home" content="Trang chủ" as={Link} to="/" />
                    </Menu.Item>
                </Menu>
                <Grid style={{ marginTop: -4 }}>
                    <Button.Group vertical style={{ position: "fixed", right: 10, bottom: "30%" }}>
                        <Button icon="facebook" color="facebook" href="#header" />
                        <Button icon="facebook messenger" color="blue" href="#header" />
                        <Button icon="twitter" color="twitter" href="#header" />
                        <Button icon="instagram" color="instagram" href="#header" />
                        <Button icon="mail" color="red" href="mailto:stungle154@gmail.com" />
                    </Button.Group>
                    <Button.Group vertical style={{ position: "fixed", right: 10, bottom: 10 }}>
                        <Button icon="arrow up" color="yellow" href="#header" />
                    </Button.Group>
                </Grid>
            </div>
        );
    }
}


export default Layout;
