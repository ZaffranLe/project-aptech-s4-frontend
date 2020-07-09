import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Badge, Input } from "./../../../components";

const ProductsLeftNav = (props) => {
    const productTypes = useSelector((state) => state.ProductsReducer.productTypes);
    const products = useSelector((state) => state.ProductsReducer.products);
    return (
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
                    {productTypes.map((type, idx) => {
                        return (
                            <NavItem key={idx}>
                                <NavLink href="#" className="d-flex">
                                    <i className="fa fa-fw fa-circle align-self-center mr-2"></i>
                                    {type["ProductType"]["Name"]}
                                    <Badge color="secondary" pill className="ml-auto align-self-center">
                                        {
                                            products.filter(
                                                (product) =>
                                                    product["Product"]["IdProductType"] == type["ProductType"]["Id"]
                                            ).length
                                        }
                                    </Badge>
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </div>
            {/* END Left Nav  */}
        </React.Fragment>
    );
};

export { ProductsLeftNav };
