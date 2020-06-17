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
import { ProductTypeActions } from "../../../redux/_actions/ProductTypes/ProductTypesA";
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
        const { type } = this.props;
        if (type) {
            const images = [];
            if (type["ListImagesUrl"].length > 0) {
                type["ListImagesỦrl"].map((img, idx) => {
                    images.push({
                        isDeleted: false,
                        id: img["Id"],
                        url: img["ImageUrl"],
                    });
                });
            }
            this.setState({
                Name: type["ProductType"]["Name"],
                ImageId: type["ProductType"]["ImageId"].split(",") || [],
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
            imageData.delete(img["name"]);
            imagesPreview.splice(imagesPreview.indexOf(img), 1);
            this.setState({
                imagesPreview,
                imageData
            })
        }
    }

    handleSave = () => {
        const { Name, imageData, ImageId } = this.state;
        const data = {
            Name,
            ImageId,
            imageData
        };
        this.props.onSave(data);
    }

    render() {
        const { isOpen, onClose } = this.props;
        const { Name, Images, imagesPreview } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Loại sản phẩm</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Loại sản phẩm</Label>
                            <Input value={Name} onChange={this.handleChange("Name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ảnh minh họa</Label>
                            <Input type="file" multiple accept="image/*" onChange={this.handlePreviewImages} />
                        </FormGroup>
                    </Form>
                    {imagesPreview.length > 0 && (
                        <Container>
                            <Row>
                                {imagesPreview.map((img) => {
                                    return (
                                        <Col lg={3} key={img["name"]}>
                                            <Button close onClick={() => this.handleRemoveImg(img, "preview")} />
                                            <img src={img["url"]} height="100" width="100" />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>Lưu</Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
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

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            productType: "",
        });
    };

    handleOpenModifyModal = (productType = "") => {
        this.setState({
            modifyModal: true,
            productType,
        });
    };

    handleSaveProductType = (data) => {
        const {productType } = this.state;
        if (productType) {
            this.props.dispatch(ProductTypeActions.updateProductType(productType["Id"], data));
        } else {
            this.props.dispatch(ProductTypeActions.createProductType(data));
        }
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
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo sản phẩm mới
                        </Button>
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
                                                <tr key={type["ProductType"]["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>#Ảnh</td>
                                                    <td>{type["ProductType"]["Name"]}</td>
                                                    <td>{moment(type["ProductType"]["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>{moment(type["ProductType"]["UpdatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>
                                                        <Button color="yellow" onClick={() => this.handleOpenModifyModal(type)}>
                                                            Edit
                                                        </Button>{" "}
                                                        <Button color="danger">Delete</Button>
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
                <ModifyModal key={productType["Id"] || v1()} type={productType} isOpen={modifyModal} onClose={this.handleCloseModifyModal} onSave={this.handleSaveProductType} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductTypesReducer }) => ProductTypesReducer;

export default connect(mapStateToProps, null)(ProductTypesList);
