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
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render() {
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
                                                    <Input onChange={this.handleChange("IdDisplay")} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Mô tả</Label>
                                                    <Input onChange={this.handleChange("Description")} />
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
                                                    <Input onChange={this.handleChange("IdProductType")} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Giá bán</Label>
                                                    <Input onChange={this.handleChange("UnitPrice")} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Ảnh sản phẩm</Label>
                                                    <Button color="link" className="text-primary">
                                                        <i className="fa fa-fw fa-plus"></i>Thêm ảnh
                                                    </Button>
                                                </FormGroup>
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

export default CreateProduct;
