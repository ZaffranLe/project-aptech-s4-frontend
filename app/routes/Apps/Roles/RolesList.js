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
import { RoleActions } from "../../../redux/_actions/Roles/RolesA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Description: "",
        };
    }

    componentDidMount() {
        const { role } = this.props;
        if (role) {
            this.setState({
                Name: role["Name"],
                Description: role["Description"],
            });
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSave = () => {
        const { Name, Description } = this.state;
        const data = {
            Name,
            Description,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Description } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Chức vụ</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Tên</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mô tả</Label>
                            <Input
                                value={Description}
                                onChange={this.handleChange("Description")}
                            />
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

class RolesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(RoleActions.getAllRole());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(RoleActions.getAllRole());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            role: "",
        });
    };

    handleOpenModifyModal = (role = "") => {
        this.setState({
            modifyModal: true,
            role,
        });
    };

    handleSaveRole = (data) => {
        const { role } = this.state;
        if (role) {
            this.props.dispatch(RoleActions.updateRole(role["Role"]["Id"], data));
        } else {
            this.props.dispatch(RoleActions.createRole(data));
        }
    };

    handleDeleteRole = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá chức vụ này?")) {
            this.props.dispatch(RoleActions.deleteRole(id));
        }
    };

    render() {
        const { roles } = this.props;
        const { role, modifyModal } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Chức vụ" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo chức vụ mới
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {roles.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên chức vụ</th>
                                            <th>Mô tả</th>
                                            <th>Ngày tạo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.map((role, idx) => {
                                            return (
                                                <tr key={role["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{role["Name"]}</td>
                                                    <td>{role["Description"]}</td>
                                                    <td>
                                                        {moment(role["CreatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() =>
                                                                this.handleOpenModifyModal(
                                                                    role
                                                                )
                                                            }
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeleteRole(
                                                                    role["Role"]["Id"]
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
                    key={role["Id"] || v1()}
                    role={role}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveRole}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ RolesReducer }) => RolesReducer;

export default connect(mapStateToProps, null)(RolesList);
