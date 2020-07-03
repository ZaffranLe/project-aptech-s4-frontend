import React from "react";
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
    Container,
} from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { ProductTypeActions } from "../../../redux/_actions/ProductTypes/ProductTypesA";
import { ManufacturerActions } from "../../../redux/_actions/Manufacturers/ManufacturersA";
import { v4 } from "uuid";
import { debounce } from "lodash";

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IdDisplay: "",
            Name: "",
            Description: "",
            Quantity: 0,
            UnitPrice: 0,
            SupportDuration: 0,
            IdManufacturer: "",
            IdProductType: "",
            imagesPreview: [],
            imageData: new FormData(),
            Properties: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(ManufacturerActions.getAllManufacturer());
        this.props.dispatch(ProductTypeActions.getAllProductType());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isCreatedSucceed } = nextProps;
        if (isCreatedSucceed) {
            this.props.history.push("/apps/products");
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

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

    handleChangeProperty = (name, idx) => (e) => {
        const Properties = [...this.state.Properties];
        Properties[idx][name] = e.target.value;
        this.setState({
            Properties,
        });
    };

    handleAddProperty = () => {
        this.setState({
            Properties: [
                ...this.state.Properties,
                {
                    Name: "",
                    Data: "",
                },
            ],
        });
    };

    handleCreateProduct = () => {
        const {
            imageData,
            Name,
            IdDisplay,
            Description,
            Quantity,
            IdProductType,
            UnitPrice,
            IdManufacturer,
            SupportDuration,
            Properties,
        } = this.state;
        const productData = {
            Product: {
                Name,
                IdDisplay,
                Description,
                Quantity: parseInt(Quantity),
                IdProductType: parseInt(IdProductType),
                UnitPrice: parseFloat(UnitPrice),
                IdManufacturer: parseInt(IdManufacturer),
                SupportDuration: parseInt(SupportDuration),
                ImageId: [],
            },
            Properties,
        };
        const info = {
            productData,
            imageData,
        };
        this.props.dispatch(ProductActions.createProduct(info));
    };

    render() {
        const {
            imagesPreview,
            Name,
            IdDisplay,
            Description,
            Quantity,
            IdProductType,
            UnitPrice,
            IdManufacturer,
            SupportDuration,
            Properties,
        } = this.state;
        const { manufacturers, productTypes } = this.props;
        return (
            <React.Fragment>
                <HeaderMain title="Tạo sản phẩm mới" className="mb-5 mt-4" />
                <Row>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <Form>
                            <Row>
                                <Col lg={8}>
                                    <Container>
                                        <Row>
                                            <Col lg={12} className="table-bordered">
                                                <h4 className="mt-2">Thông tin chung</h4>
                                                <FormGroup>
                                                    <Label>Tên sản phẩm</Label>
                                                    <Input value={Name} onChange={this.handleChange("Name")} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Mã sản phẩm/SKU</Label>
                                                    <Input
                                                        value={IdDisplay}
                                                        onChange={this.handleChange("IdDisplay")}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Mô tả</Label>
                                                    <Input
                                                        value={Description}
                                                        onChange={this.handleChange("Description")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="table-bordered mt-4">
                                                <FormGroup>
                                                    <Label>Nhà sản xuất</Label>
                                                    <Input
                                                        type="select"
                                                        onChange={this.handleChange("IdManufacturer")}
                                                        value={IdManufacturer}
                                                    >
                                                        <option value={null}>--Chọn nhà sản xuất--</option>
                                                        {manufacturers.map((manufacturer, idx) => {
                                                            return (
                                                                <option
                                                                    key={idx}
                                                                    value={manufacturer["Manufacturer"]["Id"]}
                                                                >
                                                                    {manufacturer["Manufacturer"]["Name"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Thời gian bảo hành (tháng)</Label>
                                                    <Input
                                                        value={SupportDuration}
                                                        onChange={this.handleChange("SupportDuration")}
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="table-bordered mt-4">
                                                <h4 className="mt-2">Thuộc tính</h4>
                                                <Button onClick={this.handleAddProperty} color="info" className="mb-4">
                                                    <i className="fa fa-fw fa-plus"></i> Thêm thuộc tính mới
                                                </Button>
                                                {Properties.map((property, idx) => {
                                                    return (
                                                        <Row form key={idx}>
                                                            <Col lg={5}>
                                                                <FormGroup>
                                                                    <Label>Tên</Label>
                                                                    <Input
                                                                        value={property["Name"]}
                                                                        onChange={this.handleChangeProperty(
                                                                            "Name",
                                                                            idx
                                                                        )}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg={5}>
                                                                <FormGroup>
                                                                    <Label>Giá trị</Label>
                                                                    <Input
                                                                        value={property["Data"]}
                                                                        onChange={this.handleChangeProperty(
                                                                            "Data",
                                                                            idx
                                                                        )}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg={2}>
                                                                <br />
                                                                <Button color="danger" className="mt-2">
                                                                    <i className="fa fa-fw fa-trash"></i>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col lg={4}>
                                    <Container>
                                        <Row>
                                            <Col lg={12} className="table-bordered">
                                                <h4 className="mt-2">Phân loại</h4>
                                                <FormGroup>
                                                    <Label>Loại sản phẩm</Label>
                                                    <Input
                                                        type="select"
                                                        onChange={this.handleChange("IdProductType")}
                                                        value={IdProductType}
                                                    >
                                                        <option value={null}>--Chọn loại sản phẩm--</option>
                                                        {productTypes.map((type, idx) => {
                                                            return (
                                                                <option key={idx} value={type["ProductType"]["Id"]}>
                                                                    {type["ProductType"]["Name"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Giá bán</Label>
                                                    <Input
                                                        value={UnitPrice}
                                                        onChange={this.handleChange("UnitPrice")}
                                                        type="number"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Ảnh sản phẩm</Label>
                                                    <Input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={this.handlePreviewImages}
                                                    />
                                                </FormGroup>
                                                <Container>
                                                    <Row>
                                                        {imagesPreview.length > 0 &&
                                                            imagesPreview.map((img) => {
                                                                return (
                                                                    <Col lg={4} key={img["name"]}>
                                                                        <img
                                                                            src={img["url"]}
                                                                            height="100"
                                                                            width="100"
                                                                        />
                                                                    </Col>
                                                                );
                                                            })}
                                                    </Row>
                                                </Container>
                                                <Button
                                                    onClick={this.handleCreateProduct}
                                                    color="primary"
                                                    className="mt-4 mb-4"
                                                >
                                                    Tạo sản phẩm
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ProductsReducer }) => ProductsReducer;

export default connect(mapStateToProps, null)(CreateProduct);
