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
import { PermissionActions } from "../../../redux/_actions/Permissions/PermissionsA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import { Private } from "../../../components/Private";
import { PERMISSIONS } from "../../../utils/_permissions"

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Description: "",
        };
    }

    componentDidMount() {
        const { permission } = this.props;
        if (permission) {
            this.setState({
                Name: permission["Name"],
                Description: permission["Description"],
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
                <ModalHeader>Quyền hạn</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Tên</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mô tả</Label>
                            <Input value={Description} onChange={this.handleChange("Description")} />
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

class PermissionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(PermissionActions.getAllPermission());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(PermissionActions.getAllPermission());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            permission: "",
        });
    };

    handleOpenModifyModal = (permission = "") => {
        this.setState({
            modifyModal: true,
            permission,
        });
    };

    handleSavePermission = (data) => {
        const { permission } = this.state;
        if (permission) {
            this.props.dispatch(PermissionActions.updatePermission(permission["Permission"]["Id"], data));
        } else {
            this.props.dispatch(PermissionActions.createPermission(data));
        }
    };

    handleDeletePermission = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá quyền hạn này?")) {
            this.props.dispatch(PermissionActions.deletePermission(id));
        }
    };

    render() {
        const { permissions, isLoading } = this.props;
        const { permission, modifyModal } = this.state;
        return (
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_PERMISSION}>
                <Row>
                    <Col lg={12}>
                        <HeaderMain title="Quyền hạn" className="mb-5 mt-4" />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {permissions.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên quyền hạn</th>
                                            <th>Mô tả</th>
                                            <th>Ngày tạo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.map((permission, idx) => {
                                            return (
                                                <tr key={permission["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{permission["Name"]}</td>
                                                    <td>{permission["Description"]}</td>
                                                    <td>
                                                        {moment(permission["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() => this.handleOpenModifyModal(permission)}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeletePermission(permission["Id"])
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
                    key={permission["Id"] || v1()}
                    permission={permission}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSavePermission}
                />
                <Loading isLoading={isLoading} />
            </Private>
        );
    }
}

const mapStateToProps = ({ PermissionsReducer }) => PermissionsReducer;

export default connect(mapStateToProps, null)(PermissionsList);
