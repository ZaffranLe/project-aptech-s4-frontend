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
    CustomInput,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "./../../../components";
import { RoleActions } from "../../../redux/_actions/Roles/RolesA";
import { PermissionActions } from "../../../redux/_actions/Permissions/PermissionsA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import Private from "../../../components/Private";
import { PERMISSIONS } from "../../../utils/_permissions";
class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Description: "",
            search: "",
            RolePermissions: [],
            currentPage: 0,
            itemsPerPage: 10,
            PermissionsToChange: [],
            isCreating: true,
        };
    }

    componentDidMount() {
        const { role } = this.props;
        if (role) {
            this.setState({
                Name: role["Role"]["Name"],
                Description: role["Role"]["Description"],
                RolePermissions: role["ListPermission"],
                currentPage: 0,
                isCreating: false,
            });
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSave = () => {
        const { Name, Description, PermissionsToChange } = this.state;
        const data = {
            Name,
            Description,
            PermissionsToChange,
        };
        this.props.onSave(data);
    };

    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected,
        });
    };

    handleCheckPermission = (permissionId) => (e) => {
        const { role } = this.props;
        const PermissionsToChange = [...this.state.PermissionsToChange];
        const isExistPermission = PermissionsToChange.findIndex((data) => data["IdPermission"] == permissionId);
        if (isExistPermission == -1) {
            PermissionsToChange.push({
                IdRole: role ? role["Role"]["Id"] : 0,
                IdPermission: permissionId,
                Action: e.target.checked ? 1 : 0,
            });
        } else {
            PermissionsToChange.splice(isExistPermission, 1);
        }
        this.setState({
            PermissionsToChange,
        });
    };

    render() {
        const { isOpen, onClose, permissions } = this.props;
        const { Name, Description, search, RolePermissions, currentPage, itemsPerPage, isCreating } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose} size="lg">
                <ModalHeader>Chức vụ</ModalHeader>
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
                        <Container className="table-bordered">
                            <Input
                                value={search}
                                onChange={this.handleChange("search")}
                                placeholder="Tìm kiếm..."
                                className="mt-4 mb-2"
                            />
                            {permissions.length > 0 && (
                                <>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Quyền hạn</th>
                                                <th>Mô tả</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissions
                                                .filter(
                                                    (permission) =>
                                                        permission["Name"].includes(search.trim()) ||
                                                        permission["Description"].includes(search.trim())
                                                )
                                                .slice(itemsPerPage * currentPage, itemsPerPage * (currentPage + 1))
                                                .map((permission, idx) => {
                                                    const hasPermission = RolePermissions.find(
                                                        (data) => data["Id"] == permission["Id"]
                                                    );
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{itemsPerPage * currentPage + idx + 1}</td>
                                                            <td>{permission["Name"]}</td>
                                                            <td>{permission["Description"]}</td>
                                                            <td>
                                                                <CustomInput
                                                                    type="checkbox"
                                                                    id={idx}
                                                                    defaultChecked={hasPermission}
                                                                    onChange={this.handleCheckPermission(
                                                                        permission["Id"]
                                                                    )}
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </Table>
                                    <ReactPaginate
                                        previousLabel={"<<"}
                                        nextLabel={">>"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={Math.ceil(permissions.length / itemsPerPage)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                    />
                                </>
                            )}
                        </Container>
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
        this.props.dispatch(PermissionActions.getAllPermission());
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
        const { roles, permissions, isLoading } = this.props;
        const { role, modifyModal } = this.state;
        return (
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_ROLE}>
                <React.Fragment>
                    <Row>
                        <Col lg={9}>
                            <HeaderMain title="Chức vụ" className="mb-5 mt-4" />
                        </Col>
                        <Col lg={3} className="text-right mt-4">
                            <Private PERMISSION={PERMISSIONS.CREATE_ROLE} pageWrapper={false}>
                                <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                                    Tạo chức vụ mới
                                </Button>
                            </Private>
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
                                                    <tr key={role["Role"]["Id"]}>
                                                        <td>{idx + 1}</td>
                                                        <td>{role["Role"]["Name"]}</td>
                                                        <td>{role["Role"]["Description"]}</td>
                                                        <td>
                                                            {moment(role["Role"]["CreatedAt"]).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="yellow"
                                                                size="sm"
                                                                onClick={() => this.handleOpenModifyModal(role)}
                                                            >
                                                                Chỉnh sửa
                                                            </Button>{" "}
                                                            <Button
                                                                size="sm"
                                                                color="danger"
                                                                onClick={() =>
                                                                    this.handleDeleteRole(role["Role"]["Id"])
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
                        key={role ? role["Role"]["Id"] : v1()}
                        role={role}
                        isOpen={modifyModal}
                        onClose={this.handleCloseModifyModal}
                        onSave={this.handleSaveRole}
                        permissions={permissions}
                    />
                    <Loading isLoading={isLoading} />
                </React.Fragment>
            </Private>
        );
    }
}

const mapStateToProps = ({ RolesReducer }) => RolesReducer;

export default connect(mapStateToProps, null)(RolesList);
