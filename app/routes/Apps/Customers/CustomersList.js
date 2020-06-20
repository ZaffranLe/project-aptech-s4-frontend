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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "./../../../components";
import { CustomerActions } from "../../../redux/_actions/Customers/CustomersA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: "",
            Email: "",
            Phone: "",
        };
    }

    componentDidMount() {
        const { customer } = this.props;
        if (customer) {
            this.setState({
                Name: customer["Name"],
                Address: customer["Address"],
                Email: customer["Email"],
                Phone: customer["Phone"],
            });
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };


    handleSave = () => {
        const { Name, Address, Email, Phone } = this.state;
        const data = {
            Name,
            Address,
            Email,
            Phone
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Address, Phone, Email } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Nhà sản xuất</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nhà sản xuất</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ảnh minh họa</Label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={this.handlePreviewImages}
                            />
                        </FormGroup>
                    </Form>
                    <Container>
                        <Row>
                            {Images.length > 0 &&
                                Images.map((img) => {
                                    return (
                                        <Col lg={3} key={img["id"]}>
                                            <Button
                                                close
                                                onClick={() => this.handleRemoveImg(img, "current")}
                                            />
                                            <img src={img["url"]} height="100" width="100" />
                                        </Col>
                                    );
                                })}
                            {imagesPreview.length > 0 &&
                                imagesPreview.map((img) => {
                                    return (
                                        <Col lg={3} key={img["name"]}>
                                            <Button
                                                close
                                                onClick={() => this.handleRemoveImg(img, "preview")}
                                            />
                                            <img src={img["url"]} height="100" width="100" />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>
                        Lưu
                    </Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class CustomersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(CustomerActions.getAllCustomer());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(CustomerActions.getAllCustomer());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            customer: "",
        });
    };

    handleOpenModifyModal = (customer = "") => {
        this.setState({
            modifyModal: true,
            customer,
        });
    };

    handleSaveCustomer = (data) => {
        const { customer } = this.state;
        if (customer) {
            this.props.dispatch(
                CustomerActions.updateCustomer(customer["Customer"]["Id"], data)
            );
        } else {
            this.props.dispatch(CustomerActions.createCustomer(data));
        }
    };

    handleDeleteCustomer = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nhà sản xuất này?")) {
            this.props.dispatch(CustomerActions.deleteCustomer(id));
        }
    };

    render() {
        const { customers } = this.props;
        const { customer, modifyModal } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Nhà sản xuất" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo nhà sản xuất mới
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {customers.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên nhà sản xuất</th>
                                            <th>Ngày tạo</th>
                                            <th>Ngày chỉnh sửa cuối</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((type, idx) => {
                                            return (
                                                <tr key={type["Customer"]["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{type["Customer"]["Name"]}</td>
                                                    <td>
                                                        {moment(
                                                            type["Customer"]["CreatedAt"]
                                                        ).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            type["Customer"]["UpdatedAt"]
                                                        ).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() =>
                                                                this.handleOpenModifyModal(type)
                                                            }
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeleteCustomer(
                                                                    type["Customer"]["Id"]
                                                                )
                                                            }
                                                        >
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
                <ModifyModal
                    key={customer["Id"] || v1()}
                    customer={customer}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveCustomer}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ CustomersReducer }) => CustomersReducer;

export default connect(mapStateToProps, null)(CustomersList);
