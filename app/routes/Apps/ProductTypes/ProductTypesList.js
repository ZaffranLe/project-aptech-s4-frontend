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

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Images: [],
            formData: new FormData()
        }
    }

    componentDidMount() {
        const { type } = this.props;
        if (type) {
            const images = [];
            if (type["ListImage"].length > 0) {
                type["ListImage"].map((img, idx) => {
                    images.push({
                        isDeleted: false,
                        id: img["Id"],
                        url: img["ImageUrl"]
                    });
                })
            }
            this.setState({
                Name: type["ProductType"]["Name"],
                Images: images
            })
        }
    }

    handlePreviewImages = (e) => {
        const imagesPreview = [];
        const formData = new FormData();
        for (let file of e.target.files) {
            const name = v4();
            imagesPreview.push({
                url: URL.createObjectURL(file),
                name,
            });
            formData.append(name, file);
        }
        this.setState({
            imagesPreview,
            formData
        });
    };

    render() {
        const { isOpen, onClose }= this.props;
        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader>
                    Loại sản phẩm
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Lưu</Button>
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
        })
    }

    handleOpenModifyModal = (productType = "") => {
        this.setState({
            modifyModal: true,
            productType,
        })
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
                        <Button color="primary" onClick={this.handleOpenModifyModal} >Tạo sản phẩm mới</Button>
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
                                                        <Button color="yellow" onClick={() => this.handleOpenModifyModal(type)}>Edit</Button>{" "}
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
                <ModifyModal key={productType["Id"] || v1()} type={productType} isOpen={modifyModal} onClose={this.handleCloseModifyModal} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductTypesReducer }) => ProductTypesReducer;

export default connect(mapStateToProps, null)(ProductTypesList);
