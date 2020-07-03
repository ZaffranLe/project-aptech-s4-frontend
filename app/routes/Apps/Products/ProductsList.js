import React from "react";
import { Row, Col, Button, Alert, Container, Table } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { Paginations } from "../../components/Paginations";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { Link } from "react-router-dom";
import moment from "moment";
import updateImg from "./update.png";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ProductActions.getAllProduct());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload } = nextProps;
        if (isReload) {
            this.props.dispatch(ProductActions.getAllProduct());
        }
    }

    handleDeleteProduct = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            this.props.dispatch(ProductActions.deleteProduct(id));
        }
    }

    render() {
        const { products } = this.props;
        return (
            <React.Fragment>
                <>
                    <Row>
                        <Col lg={9}>
                            <HeaderMain title="Danh sách sản phẩm" className="mb-5 mt-4" />
                        </Col>
                        <Col lg={3} className="text-right mt-4">
                            <Link to="/apps/products/create">
                                <Button color="primary" className="float-right">
                                    Tạo sản phẩm mới
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Container fluid>
                                {products.length > 0 ? (
                                    <Table hover striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Ảnh</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Số lượng tồn</th>
                                                <th>Đơn giá</th>
                                                <th>Ngày tạo</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, idx) => {
                                                return (
                                                    <tr key={product["Product"]["Id"]}>
                                                        <td>{idx + 1}</td>
                                                        <td>
                                                            <img
                                                                width="75" height="75"
                                                                src={
                                                                    product["ListImages"].length > 0
                                                                        ? product["ListImages"][0]["ImageUrl"]
                                                                        : updateImg
                                                                }
                                                            />
                                                        </td>
                                                        <td>{product["Product"]["IdDisplay"]}</td>
                                                        <td>{product["Product"]["Name"]}</td>
                                                        <td>{product["Product"]["Quantity"]}</td>
                                                        <td>{product["Product"]["UnitPrice"]}</td>
                                                        <td>{moment(product["Product"]["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                        <td>
                                                            <Button color="yellow" size="sm">
                                                                Chỉnh sửa
                                                            </Button>{" "}
                                                            <Button size="sm" color="danger" onClick={() => this.handleDeleteProduct(product["Product"]["Id"])}>
                                                                Xoá
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <Alert color="warning">Chưa có dữ liệu để hiển thị</Alert>
                                )}
                            </Container>
                        </Col>
                    </Row>
                </>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductsReducer }) => ProductsReducer;
export default connect(mapStateToProps, null)(ProductsList);
