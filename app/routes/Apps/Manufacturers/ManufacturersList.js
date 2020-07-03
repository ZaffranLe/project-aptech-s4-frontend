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
import { ManufacturerActions } from "../../../redux/_actions/Manufacturers/ManufacturersA";
import { v1, v4 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Images: [],
            imageData: new FormData(),
            imagesPreview: [],
            ImageId: [],
        };
    }

    componentDidMount() {
        const { manufacturer } = this.props;
        if (manufacturer) {
            const images = [];
            if (manufacturer["ListImages"].length > 0) {
                manufacturer["ListImages"].map((img, idx) => {
                    images.push({
                        id: img["Id"],
                        url: img["ImageUrl"],
                    });
                });
            }
            const ImageId = manufacturer["Manufacturer"]["ImageId"]
                ? manufacturer["Manufacturer"]["ImageId"].split(",").map((id) => parseInt(id))
                : [];

            this.setState({
                Name: manufacturer["Manufacturer"]["Name"],
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
        const { Name, imageData, ImageId } = this.state;
        const data = {
            Name,
            ImageId,
            imageData,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Images, imagesPreview } = this.state;
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

class ManufacturersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturer: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ManufacturerActions.getAllManufacturer());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(ManufacturerActions.getAllManufacturer());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            manufacturer: "",
        });
    };

    handleOpenModifyModal = (manufacturer = "") => {
        this.setState({
            modifyModal: true,
            manufacturer,
        });
    };

    handleSaveManufacturer = (data) => {
        const { manufacturer } = this.state;
        if (manufacturer) {
            this.props.dispatch(
                ManufacturerActions.updateManufacturer(manufacturer["Manufacturer"]["Id"], data)
            );
        } else {
            this.props.dispatch(ManufacturerActions.createManufacturer(data));
        }
    };

    handleDeleteManufacturer = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nhà sản xuất này?")) {
            this.props.dispatch(ManufacturerActions.deleteManufacturer(id));
        }
    };

    render() {
        const { manufacturers } = this.props;
        const { manufacturer, modifyModal } = this.state;
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
                            {manufacturers.length > 0 ? (
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
                                        {manufacturers.map((manufacturer, idx) => {
                                            return (
                                                <tr key={manufacturer["Manufacturer"]["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{manufacturer["Manufacturer"]["Name"]}</td>
                                                    <td>
                                                        {moment(
                                                            manufacturer["Manufacturer"][
                                                                "CreatedAt"
                                                            ]
                                                        ).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            manufacturer["Manufacturer"][
                                                                "UpdatedAt"
                                                            ]
                                                        ).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() =>
                                                                this.handleOpenModifyModal(
                                                                    manufacturer
                                                                )
                                                            }
                                                        >
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeleteManufacturer(
                                                                    manufacturer["Manufacturer"][
                                                                        "Id"
                                                                    ]
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
                    key={manufacturer ? manufacturer["Manufacturer"]["Id"] : v1()}
                    manufacturer={manufacturer}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveManufacturer}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ManufacturersReducer }) => ManufacturersReducer;

export default connect(mapStateToProps, null)(ManufacturersList);
