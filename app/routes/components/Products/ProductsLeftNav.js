import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Badge, Input } from "./../../../components";
import utilConstants from "../../../utils/_constants";

function ProductsLeftNav(props) {
    const productTypes = useSelector((state) => state.ProductsReducer.productTypes);
    const products = useSelector((state) => state.ProductsReducer.products);
    const manufacturers = useSelector((state) => state.ProductsReducer.manufacturers);
    const { handleChange, idProductType, idManufacturer } = props;
    return (
        <React.Fragment>
            {/* START Left Nav  */}
            <div className="mb-4">
                <div className="big mb-3">Lọc sản phẩm</div>
                <Nav vertical>
                    <NavItem className="mt-2">
                        <Input
                            name="name"
                            placeholder="Tìm kiếm..."
                            onChange={(e) => handleChange("search", e.target.value)}
                        />
                    </NavItem>
                    <NavItem className="mt-2">
                        <Input
                            type="select"
                            name="sortProduct"
                            onChange={(e) => handleChange("sortType", e.target.value)}
                        >
                            <option value={null}>Sắp xếp sản phẩm</option>
                            <option value={utilConstants.SORT_TYPES.NEWEST}>Mới nhất</option>
                            <option value={utilConstants.SORT_TYPES.PRICE_ASC}>Giá tăng dần</option>
                            <option value={utilConstants.SORT_TYPES.PRICE_DESC}>Giá giảm dần</option>
                            <option value={utilConstants.SORT_TYPES.NAME_ASC}>Tên A-Z</option>
                            <option value={utilConstants.SORT_TYPES.NAME_DESC}>Tên Z-A</option>
                        </Input>
                    </NavItem>
                </Nav>
            </div>
            {/* END Left Nav  */}
            {/* START Left Nav  */}
            <hr />
            <div className="mb-4">
                <h4>Loại sản phẩm</h4>
                <Nav vertical>
                    {productTypes.map((type, idx) => {
                        return (
                            <NavItem key={idx}>
                                <NavLink
                                    href="#"
                                    onClick={() => handleChange("idProductType", type["ProductType"]["Id"])}
                                    className="d-flex"
                                >
                                    <i
                                        className={
                                            "fa fa-fw fa-circle align-self-center mr-2 " +
                                            (idProductType == type["ProductType"]["Id"] ? "text-primary" : "")
                                        }
                                    ></i>
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
                <hr />
                <h4>Hãng sản xuất</h4>
                <Nav vertical>
                    {manufacturers.map((manufacturer, idx) => {
                        return (
                            <NavItem key={idx}>
                                <NavLink
                                    href="#"
                                    onClick={() => handleChange("idManufacturer", manufacturer["Manufacturer"]["Id"])}
                                    className="d-flex"
                                >
                                    <i
                                        className={
                                            "fa fa-fw fa-circle align-self-center mr-2 " +
                                            (idManufacturer == manufacturer["Manufacturer"]["Id"] ? "text-primary" : "")
                                        }
                                    ></i>
                                    {manufacturer["Manufacturer"]["Name"]}
                                    <Badge color="secondary" pill className="ml-auto align-self-center">
                                        {
                                            products.filter(
                                                (product) =>
                                                    product["Product"]["IdManufacturer"] ==
                                                    manufacturer["Manufacturer"]["Id"]
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
}

export { ProductsLeftNav };
