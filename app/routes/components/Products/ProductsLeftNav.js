import React from "react";

import { Nav, NavItem, NavLink, Badge, Input } from "./../../../components";

const ProductsLeftNav = () => (
    <React.Fragment>
        {/* START Left Nav  */}
        <div className="mb-4">
            <div className="big mb-3">Lọc sản phẩm</div>
            <Nav vertical>
                <NavItem className="mt-2">
                    <Input name="name" placeholder="Tìm kiếm..." />
                </NavItem>
                <NavItem className="mt-2">
                    <Input type="select" name="sortProduct">
                        <option value={1}>Sắp xếp sản phẩm</option>
                        <option value={1}>Mới nhất</option>
                        <option value={1}>Giá tăng dần</option>
                        <option value={1}>Giá giảm dần</option>
                        <option value={1}>Tên A-Z</option>
                        <option value={1}>Tên Z-A</option>
                    </Input>
                </NavItem>
                <NavItem className="mt-2">
                    <Input type="select" name="stockState">
                        <option value={1}>Tình trạng kho hàng</option>
                        <option value={1}>Còn hàng</option>
                    </Input>
                </NavItem>
            </Nav>
        </div>
        {/* END Left Nav  */}
        {/* START Left Nav  */}
        <hr />
        <div className="mb-4">
            <Nav vertical>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-primary align-self-center mr-2"></i>
                        Family
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            12
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-info align-self-center mr-2"></i>
                        Friends
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            3
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-success align-self-center mr-2"></i>
                        Work
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            67
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-warning align-self-center mr-2"></i>
                        Trips
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            5
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-danger align-self-center mr-2"></i>
                        Other
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            1
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <i className="fa fa-fw fa-plus mr-2"></i>
                        Add New Label
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
        {/* END Left Nav  */}
    </React.Fragment>
);

export { ProductsLeftNav };
