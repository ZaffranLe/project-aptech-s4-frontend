import React, { Component } from "react";
import {
    ButtonGroup,
    Button,
    CardTitle,
    Card,
    CardBody,
    Container,
    Input,
    Label,
} from "./../../../../components";
import { Link } from "react-router-dom";

class CreateProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <CardTitle tag="h3">Thêm mới nhà cung cấp</CardTitle>
                    <Card>
                        <CardBody>
                            <Label htmlFor="InvoiceCode">
                                Tên nhà cung cấp <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                name="InvoiceCode"
                                className="Input-group"
                                type="text"
                                value={this.state.Name}
                                required
                            />
                            <br />
                            <Label htmlFor="InvoiceCode">Mã nhà cung cấp</Label>
                            <Input
                                name="InvoiceCode"
                                className="Input-group"
                                type="text"
                                value={this.state.Id}
                            />
                            <br />
                            <Label htmlFor="InvoiceCode">Số điện thoại</Label>
                            <Input
                                name="InvoiceCode"
                                className="Input-group"
                                type="tell"
                                value={this.state.Phone}
                            />
                            <br />
                            <Label htmlFor="InvoiceCode">Email</Label>
                            <Input
                                name="InvoiceCode"
                                className="Input-group"
                                type="email"
                                value={this.state.Email}
                            />
                            <br />
                        </CardBody>
                    </Card>
                    <div className="d-flex justify-content-lg-center">
                        <ButtonGroup className="align-self-start  mt-1">
                            <Link to="/provider/create-provider">
                                <Button color="primary" className="mb-2 mr-2 px-3">
                                    Thêm nhà cung cấp
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </div>
                </Container>
            </div>
        );
    }
}

export default CreateProvider;
