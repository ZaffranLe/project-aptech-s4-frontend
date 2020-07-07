import React from "react";
import {
    Container,
    Row,
    Col,
    Loading,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import UsersCardGrid from "../../components/Users/UsersCardGrid";
import { UsersLeftNav } from "../../components/Users/UsersLeftNav";
import { connect } from "react-redux";
import { UserActions } from "../../../redux/_actions/Users/UsersA";
import { RoleActions } from "../../../redux/_actions/Roles/RolesA";
import { v1, v4 } from "uuid";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            Images: [],
            imageData: new FormData(),
            imagesPreview: [],
            ImageId: [],
            Address: "",
            Email: "",
            Phone: "",
            Name: "",
            IdRole: "",
        };
    }

    componentDidMount() {
        const { user } = this.props;
        if (user) {
            const { Address, Email, Name, Phone } = user["UserInfo"];
            const images = [];
            if (user["ListImages"].length > 0) {
                user["ListImages"].map((img, idx) => {
                    images.push({
                        id: img["Id"],
                        url: img["ImageUrl"],
                    });
                });
            }
            const ImageId = user["UserInfo"]["ImageId"]
                ? user["UserInfo"]["ImageId"].split(",").map((id) => parseInt(id))
                : [];
            this.setState({
                Address,
                Email,
                Name,
                Phone,
                ImageId,
                Images: images,
            });
        }
    }

    handlePreviewImages = (e) => {
        const imagesPreview = [];
        const imageData = new FormData();
        for (let file of e.target.files) {
            const name = v4();
            imagesPreview.push({
                url: URL.createObjectURL(file),
                name,
            });
            imageData.append(name, file);
        }
        this.setState({
            imagesPreview,
            imageData,
        });
    };

    handleRemoveImg = (img, mode) => {
        if (mode == "preview") {
            const imagesPreview = [...this.state.imagesPreview];
            const imageData = _.clone(this.state.imageData);
            imagesPreview.splice(imagesPreview.indexOf(img), 1);
            imageData.delete(img["name"]);
            this.setState({
                imagesPreview,
                imageData,
            });
        } else {
            const Images = [...this.state.Images];
            const ImageId = [...this.state.ImageId];
            ImageId.splice(ImageId.indexOf(img["id"]), 1);
            Images.splice(Images.indexOf(img), 1);
            this.setState({
                ImageId,
                Images,
            });
        }
    };

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSwitchUserStatus = (e) => {
        this.setState({
            UserStatus: e.target.checked ? 1 : 2,
        });
    };

    handleSave = () => {
        const { Name, Address, Email, Phone, imageData, ImageId, Username, Password, IdRole } = this.state;
        const userData = {
            Name,
            Address,
            Email,
            Phone,
            ImageId,
            Username,
            Password,
            IdRole,
        };
        const data = {
            userData,
            imageData,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose, user, roles } = this.props;
        const { Username, Password, Name, Address, Email, Phone, Images, imagesPreview, IdRole } = this.state;
        return (
            <Modal isOpen={isOpen}>
                <ModalHeader>Nhân viên</ModalHeader>
                <ModalBody>
                    <Form>
                        {!user && (
                            <Row form>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Tên đăng nhập</Label>
                                        <Input value={Username} onChange={this.handleChange("Username")} />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Mật khẩu</Label>
                                        <Input
                                            type="password"
                                            value={Password}
                                            onChange={this.handleChange("Password")}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        )}
                        <Row form>
                            <Col lg={6}>
                                <Label>Họ tên</Label>
                                <Input value={Name} onChange={this.handleChange("Name")} />
                            </Col>
                            <Col lg={6}>
                                <Label>Địa chỉ</Label>
                                <Input value={Address} onChange={this.handleChange("Address")} />
                            </Col>
                        </Row>
                        <Row form>
                            <Col lg={6}>
                                <Label>Email</Label>
                                <Input value={Email} onChange={this.handleChange("Email")} />
                            </Col>
                            <Col lg={6}>
                                <Label>SĐT</Label>
                                <Input value={Phone} onChange={this.handleChange("Phone")} />
                            </Col>
                        </Row>
                        {!user && (
                            <FormGroup>
                                <Label>Chức vụ</Label>
                                <Input
                                    type="select"
                                    onChange={this.handleChange("IdRole")}
                                    value={IdRole}
                                >
                                    <option value={null}>--Chọn chức vụ--</option>
                                    {roles.map((role, idx) => {
                                        return (
                                            <option key={idx} value={role["Role"]["Id"]}>
                                                {role["Role"]["Name"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label>Ảnh minh họa</Label>
                            <Input type="file" multiple accept="image/*" onChange={this.handlePreviewImages} />
                        </FormGroup>
                    </Form>
                    <Container>
                        <Row>
                            {Images.length > 0 &&
                                Images.map((img) => {
                                    return (
                                        <Col lg={3} key={img["id"]}>
                                            <Button close onClick={() => this.handleRemoveImg(img, "current")} />
                                            <img src={img["url"]} height="100" width="100" />
                                        </Col>
                                    );
                                })}
                            {imagesPreview.length > 0 &&
                                imagesPreview.map((img) => {
                                    return (
                                        <Col lg={3} key={img["name"]}>
                                            <Button close onClick={() => this.handleRemoveImg(img, "preview")} />
                                            <img src={img["url"]} height="100" width="100" />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.handleSave}>
                        Lưu
                    </Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyModal: false,
            user: "",
            randomKey: v1(),
        };
    }

    componentDidMount() {
        this.props.dispatch(UserActions.getAllUser());
        this.props.dispatch(RoleActions.getAllRole());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(UserActions.getAllUser());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleOpenModifyModal = (user = "") => {
        let randomKey = "";
        if (!user) {
            randomKey = v1();
        }
        this.setState({
            user,
            modifyModal: true,
            randomKey,
        });
    };

    handleCloseModifyModal = () => {
        this.setState({
            user: "",
            modifyModal: false,
        });
    };

    handleSave = (data) => {
        const { user } = this.state;
        if (user) {
            this.props.dispatch(UserActions.updateUser(user["UserInfo"]["IdUserLogin"], data));
        } else {
            this.props.dispatch(UserActions.createUser(data));
        }
    };

    render() {
        const { users, isLoading, roles } = this.props;
        const { user, modifyModal, randomKey } = this.state;
        return (
            <>
                <HeaderMain title="Danh sách nhân viên" className="mb-5 mt-4" />
                <Row>
                    <Col lg={3}>
                        <UsersLeftNav />
                    </Col>
                    <Col lg={9}>
                        <Row>
                            <Col lg={12}>
                                <Button color="success" onClick={() => this.handleOpenModifyModal()}>
                                    <i className="fa fa-fw fa-plus"></i> Thêm nhân viên mới
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            {users.map((user) => (
                                <Col key={user["UserInfo"]["IdUserLogin"]} className="mt-3" lg={4}>
                                    <UsersCardGrid user={user} handleOpenModifyModal={this.handleOpenModifyModal} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Loading isLoading={isLoading} />
                <ModifyModal
                    key={user ? user["UserInfo"]["IdUserLogin"] : randomKey}
                    user={user}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSave}
                    roles={roles}
                />
            </>
        );
    }
}

const mapStateToProps = ({ UsersReducer }) => UsersReducer;

export default connect(mapStateToProps, null)(Users);
