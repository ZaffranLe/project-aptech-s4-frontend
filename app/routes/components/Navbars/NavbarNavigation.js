import React from "react";
import PropTypes from "prop-types";
import { NavLink as Link } from "react-router-dom";
import classNames from "classnames";

import {
    Nav,
    DropdownToggle,
    NavLink,
    UncontrolledDropdown,
    NavItem,
    DropdownMenu,
    DropdownItem,
    NestedDropdown,
} from "./../../../components";

const NavbarNavigation = ({ accent, pills, ...navbarProps }) => (
    <Nav navbar accent={accent} pills={pills} {...navbarProps}>
        <NavItem>
            <NavLink tag={Link} to="/index">
                <span className={classNames({ "mr-3": !(pills || accent) })}>
                    <i className="fa fa-fw fa-home d-none d-md-inline"></i>
                    <span className="d-md-none">Trang chủ</span>
                </span>
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink tag={Link} to="/products">
                <span className={classNames({ "mr-3": !(pills || accent) })}>
                    <span>Sản phẩm</span>
                </span>
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink tag={Link} to="/cart">
                <span className={classNames({ "mr-3": !(pills || accent) })}>
                    <span>Giỏ hàng</span>
                </span>
            </NavLink>
        </NavItem>
    </Nav>
);
NavbarNavigation.propTypes = {
    pills: PropTypes.bool,
    accent: PropTypes.bool,
};

export { NavbarNavigation };
