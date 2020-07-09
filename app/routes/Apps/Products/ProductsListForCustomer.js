import React from "react";
import { Row, Col, Loading } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { ProductsCardGrid } from "../../components/Products/ProductsCardGrid";
import { ProductsLeftNav } from "../../components/Products/ProductsLeftNav";
import { Paginations } from "../../components/Paginations";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { ProductTypeActions } from "../../../redux/_actions/ProductTypes/ProductTypesA";
import { ManufacturerActions } from "../../../redux/_actions/Manufacturers/ManufacturersA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import utilConstants from "../../../utils/_constants";

class ProductsListForCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            itemsPerPage: 9,
            search: "",
            sortType: 0,
            idProductType: "",
            idManufacturer: "",
        };
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getAllProduct());
        this.props.dispatch(ProductTypeActions.getAllProductType());
        this.props.dispatch(ManufacturerActions.getAllManufacturer());
        this.props.dispatch(
            NavbarActions.switchPage([
                {
                    hasLink: false,
                    link: "",
                    title: "Sản phẩm",
                },
            ])
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload } = nextProps;
        if (isReload) {
            this.props.dispatch(ProductActions.getAllProduct());
        }
    }

    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected,
        });
    };

    handleChange = (name, value) => {
        if (name == "idProductType" || name == "idManufacturer") {
            if (value == this.state[name]) {
                this.setState({
                    [name]: "",
                });
            }
        } else {
            this.setState({
                [name]: value,
            });
        }
    };

    handleSort = (sortType, products) => {
        let sortedProducts = [];
        switch (parseInt(sortType)) {
            case utilConstants.SORT_TYPES.NEWEST:
                sortedProducts = _.reverse(
                    _.sortBy(products, [
                        function (product) {
                            return new Date(product["Product"]["CreatedAt"]);
                        },
                    ])
                );
                break;
            case utilConstants.SORT_TYPES.PRICE_ASC:
                sortedProducts = _.sortBy(products, [
                    function (product) {
                        return product["Product"]["UnitPrice"];
                    },
                ]);
                break;
            case utilConstants.SORT_TYPES.PRICE_DESC:
                sortedProducts = _.reverse(
                    _.sortBy(products, [
                        function (product) {
                            return product["Product"]["UnitPrice"];
                        },
                    ])
                );
                break;
            case utilConstants.SORT_TYPES.NAME_ASC:
                sortedProducts = _.reverse(
                    _.sortBy(products, [
                        function (product) {
                            return product["Product"]["Name"];
                        },
                    ])
                );
                break;
            case utilConstants.SORT_TYPES.NAME_DESC:
                sortedProducts = _.sortBy(products, [
                    function (product) {
                        return product["Product"]["Name"];
                    },
                ]);
                break;
            default:
                sortedProducts = _.cloneDeep(products);
                break;
        }
        return sortedProducts;
    };

    render() {
        const { products, isLoading } = this.props;
        const { currentPage, itemsPerPage, search, sortType, idProductType, idManufacturer } = this.state;
        const filteredProducts = this.handleSort(sortType, products).filter(
            (product) =>
                (product["Product"]["Name"].toLowerCase().includes(search.trim().toLowerCase()) ||
                    product["Product"]["IdDisplay"].toLowerCase().includes(search.trim().toLowerCase())) &&
                (idProductType ? product["Product"]["IdProductType"] == idProductType : true) &&
                (idManufacturer ? product["Product"]["IdManufacturer"] == idManufacturer : true)
        );
        return (
            <React.Fragment>
                <>
                    <HeaderMain title="Danh sách sản phẩm" className="mb-5 mt-4" />
                    <Row>
                        <Col lg={3}>
                            <ProductsLeftNav
                                handleChange={this.handleChange}
                                idManufacturer={idManufacturer}
                                idProductType={idProductType}
                            />
                        </Col>
                        <Col lg={9}>
                            {/* START Table */}
                            <Row>
                                {filteredProducts
                                    .slice(itemsPerPage * currentPage, itemsPerPage * (currentPage + 1))
                                    .map((product) => (
                                        <Col key={product["Product"]["Id"]} className="mt-3" lg={4}>
                                            <ProductsCardGrid product={product} />
                                        </Col>
                                    ))}
                            </Row>
                            <ReactPaginate
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination mt-2"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                            />
                        </Col>
                    </Row>
                </>
                <Loading isLoading={isLoading} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductsReducer }) => ProductsReducer;
export default connect(mapStateToProps, null)(ProductsListForCustomer);
