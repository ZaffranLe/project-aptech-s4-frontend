import React from "react";
import { useSelector } from "react-redux";
import Error404 from "../../routes/Pages/Error404";
import { PERMISSIONS } from "../../utils/_permissions";

const Private = (props) => {
    const { PERMISSION = null, pageWrapper = true } = props;
    const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
    const User = useSelector((state) => state.LoginReducer.User);
    return isLoggedIn && (User["ListPermission"].includes(PERMISSION) || PERMISSION == null) ? (
        React.cloneElement(props.children, { ...props, children: props.children.props.children })
    ) : pageWrapper ? (
        <Error404 />
    ) : (
        <></>
    );
};

export default Private;
