import React from "react";
import { Row, Col, Loading } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { ProductsCardGrid } from "../../components/Products/ProductsCardGrid";
import { ProductsLeftNav } from "../../components/Products/ProductsLeftNav";
import { Paginations } from "../../components/Paginations";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { ProductTypeActions } from "../../../redux/_actions/ProductTypes/ProductTypesA";
import { Link } from "react-router-dom";

class ProductsListForCustomer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getAllProduct());
        this.props.dispatch(ProductTypeActions.getAllProductType());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload } = nextProps;
        if (isReload) {
            this.props.dispatch(ProductActions.getAllProduct());
        }
    }

    render() {
        const { products, isLoading } = this.props;
        return (
            <React.Fragment>
                <>
                    <HeaderMain title="Danh sách sản phẩm" className="mb-5 mt-4" />
                    <div className="d-flex justify-content-center">
                        <Paginations />
                    </div>
                    <Row>
                        <Col lg={3}>
                            <ProductsLeftNav />
                        </Col>
                        <Col lg={9}>
                            {/* START Table */}
                            <Row>
                                {products.map((product) => (
                                    <Col key={product["Product"]["Id"]} className="mt-3" lg={4}>
                                        <ProductsCardGrid product={product} />
                                    </Col>
                                ))}
                            </Row>
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
