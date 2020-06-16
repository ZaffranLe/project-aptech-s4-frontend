import React from "react";
import { connect } from "react-redux";
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
    Alert,
    Table,
    Container,
} from "./../../../components";
import { ProductTypeActions } from "../../../redux/_actions/ProductTypes/ProductTypesA";
import { v1 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, type }= this.props;
        return (
            <Modal isOpen={isOpen}>
                
            </Modal>
        );
    }
}

class ProductTypesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ProductTypeActions.getAllProductType());
    }

    render() {
        const { productTypes } = this.props;
        const { productType, modifyModal } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Thể loại sản phẩm" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary">Tạo sản phẩm mới</Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {productTypes.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ảnh</th>
                                            <th>Tên loại sản phẩm</th>
                                            <th>Ngày tạo</th>
                                            <th>Ngày chỉnh sửa cuối</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productTypes.map((type, idx) => {
                                            return (
                                                <tr key={type["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>#Ảnh</td>
                                                    <td>{type["Name"]}</td>
                                                    <td>{type["CreatedAt"]}</td>
                                                    <td>{type["UpdatedAt"]}</td>
                                                    <td>
                                                        <Button color="yellow">Edit</Button>{" "}
                                                        <Button color="red">Delete</Button>
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
                <ModifyModal key={productType["Id"] || v1()} productType={productType} isOpen={modifyModal} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductTypesReducer }) => ProductTypesReducer;

export default connect(mapStateToProps, null)(ProductTypesList);
