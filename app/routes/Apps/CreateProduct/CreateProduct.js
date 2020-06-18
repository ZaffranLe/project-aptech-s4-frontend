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
        };
    }

    componentDidMount() {
        this.props.dispatch(ManufacturerActions.getAllManufacturer());
        this.props.dispatch(ProductTypeActions.getAllProductType());
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

    handleRemoveImg = (img) => {
        const imagesPreview = [...this.state.imagesPreview];
        const imageData = _.clone(this.state.imageData);
        imagesPreview.splice(imagesPreview.indexOf(img), 1);
        imageData.delete(img["name"]);
        this.setState({
            imagesPreview,
            imageData,
        });
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
                                                <FormGroup>
                                                    <Label>Tên sản phẩm</Label>
                                                    <Input onChange={this.handleChange("Name")} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Mã sản phẩm/SKU</Label>
                                                    <Input
                                                        onChange={this.handleChange("IdDisplay")}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Mô tả</Label>
                                                    <Input
                                                        onChange={this.handleChange("Description")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="table-bordered">
                                                <FormGroup>
                                                    <Label>Nhà sản xuất</Label>
                                                    <Input
                                                        type="select"
                                                        onChange={this.handleChange(
                                                            "IdManufacturer"
                                                        )}
                                                    >
                                                        <option value={null}>
                                                            --Chọn nhà sản xuất--
                                                        </option>
                                                        {manufacturers.map((manufacturer, idx) => {
                                                            return (
                                                                <option
                                                                    key={idx}
                                                                    value={
                                                                        manufacturer[
                                                                            "Manufacturer"
                                                                        ]["Id"]
                                                                    }
                                                                >
                                                                    {
                                                                        manufacturer[
                                                                            "Manufacturer"
                                                                        ]["Name"]
                                                                    }
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Thời gian bảo hành (tháng)</Label>
                                                    <Input
                                                        onChange={this.handleChange(
                                                            "SupportDuration"
                                                        )}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col lg={4}>
                                    <Container>
                                        <Row>
                                            <Col lg={12} className="table-bordered">
                                                <FormGroup>
                                                    <Label>Loại sản phẩm</Label>
                                                    <Input
                                                        type="select"
                                                        onChange={this.handleChange(
                                                            "IdProductType"
                                                        )}
                                                    >
                                                        <option value={null}>
                                                            --Chọn loại sản phẩm--
                                                        </option>
                                                        {productTypes.map((type, idx) => {
                                                            return (
                                                                <option
                                                                    key={idx}
                                                                    value={
                                                                        type["ProductType"]["Id"]
                                                                    }
                                                                >
                                                                    {type["ProductType"]["Name"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Giá bán</Label>
                                                    <Input
                                                        onChange={this.handleChange("UnitPrice")}
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
                                                                        <Button
                                                                            close
                                                                            onClick={() =>
                                                                                this.handleRemoveImg(
                                                                                    img
                                                                                )
                                                                            }
                                                                        />
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
