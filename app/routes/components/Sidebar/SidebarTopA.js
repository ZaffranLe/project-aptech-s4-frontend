import React from "react";
import { Link } from "react-router-dom";

import {
    Sidebar,
    UncontrolledButtonDropdown,
    Avatar,
    AvatarAddOn,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";
import { useSelector, useDispatch } from "react-redux";
const avatarImg = randomAvatar();
import { LoginActions } from "../../../redux/_actions/Login/LoginA";

const SidebarTopA = (props) => {
    const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
    const User = useSelector((state) => state.LoginReducer.User);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LoginActions.logout());
    }

    return (
        <React.Fragment>
            {/* START: Sidebar Default */}
            <Sidebar.HideSlim>
                <Sidebar.Section className="pt-0">
                    {isLoggedIn ? (
                        <>
                            <Link to="/" className="d-block">
                                <Sidebar.HideSlim>
                                    <Avatar.Image
                                        size="lg"
                                        src={
                                            User["UserInfo"]["ListImages"].length > 0
                                                ? User["UserInfo"]["ListImages"][0]["ImageUrl"]
                                                : avatarImg
                                        }
                                        addOns={[
                                            <AvatarAddOn.Icon
                                                className="fa fa-circle"
                                                color="white"
                                                key="avatar-icon-bg"
                                            />,
                                            <AvatarAddOn.Icon
                                                className="fa fa-circle"
                                                color="success"
                                                key="avatar-icon-fg"
                                            />,
                                        ]}
                                    />
                                </Sidebar.HideSlim>
                            </Link>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                    {User["UserInfo"]["UserInfo"]["Name"]}
                                    <i className="fa fa-angle-down ml-2"></i>
                                </DropdownToggle>
                                <DropdownMenu persist>
                                    <DropdownItem header>
                                        {User["UserInfo"]["UserInfo"]["Name"]}
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={handleLogout}>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Đăng xuất
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>{" "}
                        </>
                    ) : (
                        <Button color="info" tag={Link} to="/pages/login">
                            <i className="fa fa-fw fa-sign-in"></i> Đăng nhập
                        </Button>
                    )}
                </Sidebar.Section>
            </Sidebar.HideSlim>
            {/* END: Sidebar Default */}

            {/* START: Sidebar Slim */}
            <Sidebar.ShowSlim>
                <Sidebar.Section>
                    {isLoggedIn ? (
                        <Avatar.Image
                            size="sm"
                            src={
                                User["UserInfo"]["ListImages"].length > 0
                                    ? User["UserInfo"]["ListImages"][0]["ImageUrl"]
                                    : avatarImg
                            }
                            addOns={[
                                <AvatarAddOn.Icon className="fa fa-circle" color="white" key="avatar-icon-bg" />,
                                <AvatarAddOn.Icon className="fa fa-circle" color="success" key="avatar-icon-fg" />,
                            ]}
                        />
                    ) : (
                        <Button className="mr-3" size="sm" outline color="info" tag={Link} to="/pages/login">
                            <i className="fa fa-fw fa-sign-in"></i>
                        </Button>
                    )}
                </Sidebar.Section>
            </Sidebar.ShowSlim>
            {/* END: Sidebar Slim */}
        </React.Fragment>
    );
};

export { SidebarTopA };
