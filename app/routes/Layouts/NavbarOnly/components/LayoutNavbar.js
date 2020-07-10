import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Avatar,
    AvatarAddOn,
    Navbar,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    ThemeConsumer,
} from "./../../../../components";
import { randomAvatar } from "./../../../../utilities";

import { NavbarActivityFeed } from "./../../../../layout/components/NavbarActivityFeed";
import { NavbarMessages } from "./../../../../layout/components/NavbarMessages";
import { NavbarUser } from "./../../../../layout/components/NavbarUser";
import { DropdownProfile } from "./../../../components/Dropdowns/DropdownProfile";
import { NavbarNavigation } from "./../../../components/Navbars/NavbarNavigation";
import { LogoThemed } from "./../../../components/LogoThemed/LogoThemed";
import { useSelector, useDispatch } from "react-redux";
import { LoginActions } from "../../../../redux/_actions/Login/LoginA";

export const LayoutNavbar = (props) => {
    const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
    const User = useSelector((state) => state.LoginReducer.User);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LoginActions.logout());
    }
    return (
        <React.Fragment>
            <Navbar light expand="lg" themed>
                <Link to="/" className="navbar-brand mr-0 mr-sm-3">
                    <LogoThemed className="mb-1" checkBackground />
                </Link>

                <Nav pills>
                    <NavItem>
                        <NavLink tag={NavbarToggler} id="navbar-navigation-toggler" className="b-0">
                            <i className="fa fa-fw fa-bars"></i>
                        </NavLink>
                    </NavItem>
                </Nav>

                {/* Navigation with Collapse */}
                <NavbarNavigation pills />

                {/* END Navbar: Left Side */}
                {/* START Navbar: Right Side */}
                <Nav className="ml-auto" pills>
                    {isLoggedIn ? (
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
                                <Avatar.Image
                                    size="sm"
                                    src={
                                        User["UserInfo"]["ListImages"].length > 0
                                            ? User["UserInfo"]["ListImages"][0]["ImageUrl"]
                                            : randomAvatar()
                                    }
                                    addOns={[
                                        <AvatarAddOn.Icon
                                            className="fa fa-circle"
                                            color="white"
                                            key="avatar-icon-bg"
                                        />,
                                        <AvatarAddOn.Icon
                                            className="fa fa-circle"
                                            color="danger"
                                            key="avatar-icon-fg"
                                        />,
                                    ]}
                                />
                            </DropdownToggle>
                            <React.Fragment>
                                <DropdownMenu right={true}>
                                    <DropdownItem header>
                                        {User["UserInfo"]["UserInfo"]["Name"]}
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/admin">
                                        Quản lý bán hàng
                                    </DropdownItem>
                                    <DropdownItem onClick={handleLogout}>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Đăng xuất
                                    </DropdownItem>
                                </DropdownMenu>
                            </React.Fragment>
                        </UncontrolledDropdown>
                    ) : (
                        <NavItem className="d-none d-lg-block">
                            <NavLink tag={Link} to="/pages/login">
                                <i className="fa fa-sign-in"></i> Đăng nhập
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
                {/* END Navbar: Right Side */}
            </Navbar>
        </React.Fragment>
    );
};
