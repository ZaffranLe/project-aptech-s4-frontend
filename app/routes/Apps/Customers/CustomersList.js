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
    Loading,
} from "./../../../components";
import { CustomerActions } from "../../../redux/_actions/Customers/CustomersA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import Private from "../../../components/Private";
import { PERMISSIONS } from "../../../utils/_permissions"

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
            Phone,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Address, Phone, Email } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Khách hàng</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Họ tên</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Địa chỉ</Label>
                            <Input value={Address} onChange={this.handleChange("Address")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input value={Email} onChange={this.handleChange("Email")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Số điện thoại</Label>
                            <Input value={Phone} onChange={this.handleChange("Phone")} />
                        </FormGroup>
                    </Form>
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
        this.props.dispatch(
            NavbarActions.switchPage([
                {
                    hasLink: false,
                    link: "",
                    title: "Khách hàng",
                },
            ])
        );
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
            this.props.dispatch(CustomerActions.updateCustomer(customer["Customer"]["Id"], data));
        } else {
            this.props.dispatch(CustomerActions.createCustomer(data));
        }
    };

    handleDeleteCustomer = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá khách hàng này?")) {
            this.props.dispatch(CustomerActions.deleteCustomer(id));
        }
    };

    render() {
        const { customers, isLoading } = this.props;
        const { customer, modifyModal } = this.state;
        return (
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_CUSTOMER}>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Khách hàng" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo khách hàng mới
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
                                            <th>Tên khách hàng</th>
                                            <th>Email</th>
                                            <th>SĐT</th>
                                            <th>Ngày tạo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer, idx) => {
                                            return (
                                                <tr key={customer["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{customer["Name"]}</td>
                                                    <td>{customer["Email"]}</td>
                                                    <td>{customer["Phone"]}</td>
                                                    <td>
                                                        {moment(customer["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() => this.handleOpenModifyModal(customer)}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() => this.handleDeleteCustomer(customer["Id"])}
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
                <Loading isLoading={isLoading} />
            </Private>
        );
    }
}

const mapStateToProps = ({ CustomersReducer }) => CustomersReducer;

export default connect(mapStateToProps, null)(CustomersList);
