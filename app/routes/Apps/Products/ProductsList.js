import React from "react";
import {
    Row,
    Col,
    CardColumns,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Form,
    FormGroup,
    Label,
    Button,
} from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { ProductsCardGrid } from "../../components/Products/ProductsCardGrid";
import { ProductsLeftNav } from "../../components/Products/ProductsLeftNav";
import { Paginations } from "../../components/Paginations";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getAllProduct());
    }

    render() {
        return (
            <React.Fragment>
                <>
                    <HeaderMain title="Danh sách sản phẩm" className="mb-5 mt-4" />
                    <div className="d-flex justify-content-center">
                        <Paginations />
                    </div>
                    <Button color="primary" size="sm" className="float-right">
                        Tạo sản phẩm mới
                    </Button>
                    <Row>
                        <Col lg={9}>
                            {/* START Table */}
                            <Row>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                                <Col className="mt-3" lg={4}>
                                    <ProductsCardGrid />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <ProductsLeftNav />
                        </Col>
                    </Row>
                </>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductsReducer }) => ProductsReducer;
export default connect(mapStateToProps, null)(ProductsList);
