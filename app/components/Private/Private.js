import React from "react";
import { connect } from "react-redux";
import Error404 from "../../routes/Pages/Error404";

class Private extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoggedIn, User, PERMISSION, pageWrapper = true } = this.props;
        if (isLoggedIn && User["ListPermission"].includes(PERMISSION)) {
            return <>{this.props.children}</>;
        } else {
            return pageWrapper ? <Error404 /> : <></>;
        }
    }
}

const mapStateToProps = ({ LoginReducer }) => LoginReducer;

export default connect(mapStateToProps, null)(Private);
