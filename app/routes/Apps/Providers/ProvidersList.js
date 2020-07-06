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
    Loading,
    ModalBody,
    ModalFooter,
} from "./../../../components";
import { ProviderActions } from "../../../redux/_actions/Providers/ProvidersA";
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
            Phone: "",
            Email: "",
            Images: [],
            imageData: new FormData(),
            imagesPreview: [],
            ImageId: [],
        };
    }

    componentDidMount() {
        const { provider } = this.props;
        if (provider) {
            const images = [];
            if (provider["ListImages"].length > 0) {
                provider["ListImages"].map((img, idx) => {
                    images.push({
                        id: img["Id"],
                        url: img["ImageUrl"],
                    });
                });
            }
            const ImageId = provider["Provider"]["ImageId"]
                ? provider["Provider"]["ImageId"].split(",").map((id) => parseInt(id))
                : [];

            this.setState({
                Name: provider["Provider"]["Name"],
                Email: provider["Provider"]["Email"],
                Phone: provider["Provider"]["Phone"],
                Address: provider["Provider"]["Address"],
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

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
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

    handleSave = () => {
        const { Name, Address, Email, Phone, imageData, ImageId } = this.state;
        const providerData = {
            Name,
            Address,
            Email,
            Phone,
            ImageId,
        };
        const data = {
            providerData,
            imageData,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Address, Email, Phone, Images, imagesPreview } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Nhà cung cấp</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Tên</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input value={Email} onChange={this.handleChange("Email")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>SĐT</Label>
                            <Input value={Phone} onChange={this.handleChange("Phone")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Địa chỉ</Label>
                            <Input value={Address} onChange={this.handleChange("Address")} />
                        </FormGroup>
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
                    <Button color="primary" onClick={this.handleSave}>
                        Lưu
                    </Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class ProvidersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provider: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ProviderActions.getAllProvider());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(ProviderActions.getAllProvider());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            provider: "",
        });
    };

    handleOpenModifyModal = (provider = "") => {
        this.setState({
            modifyModal: true,
            provider,
        });
    };

    handleSaveProvider = (data) => {
        const { provider } = this.state;
        if (provider) {
            this.props.dispatch(ProviderActions.updateProvider(provider["Provider"]["Id"], data));
        } else {
            this.props.dispatch(ProviderActions.createProvider(data));
        }
    };

    handleDeleteProvider = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nhà cung cấp này?")) {
            this.props.dispatch(ProviderActions.deleteProvider(id));
        }
    };

    render() {
        const { providers, isLoading } = this.props;
        const { provider, modifyModal } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Nhà cung cấp" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo nhà cung cấp mới
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {providers.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>SĐT</th>
                                            <th>Ngày tạo</th>
                                            <th>Ngày chỉnh sửa cuối</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {providers.map((provider, idx) => {
                                            return (
                                                <tr key={provider["Provider"]["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{provider["Provider"]["Name"]}</td>
                                                    <td>{provider["Provider"]["Email"]}</td>
                                                    <td>{provider["Provider"]["Phone"]}</td>
                                                    <td>
                                                        {moment(provider["Provider"]["CreatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moment(provider["Provider"]["UpdatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() => this.handleOpenModifyModal(provider)}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeleteProvider(provider["Provider"]["Id"])
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
                    key={provider ? provider["Provider"]["Id"] : v1()}
                    provider={provider}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveProvider}
                />
                <Loading isLoading={isLoading} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProvidersReducer }) => ProvidersReducer;

export default connect(mapStateToProps, null)(ProvidersList);
