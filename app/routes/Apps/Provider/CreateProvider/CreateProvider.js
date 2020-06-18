import React, { Component } from 'react';
import { Container, CardBody, Card, CardTitle } from 'reactstrap';
import {    
    ButtonGroup,
    Button
} from './../../../../components';
import { Link } from "react-router-dom";

class CreateProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: ""
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <CardTitle tag="h3">Thêm mới nhà cung cấp</CardTitle>
                    <Card>
                        <CardBody>
                            <label htmlFor="InvoiceCode">Tên nhà cung cấp <span style={{ color: 'red' }}>*</span></label>
                            <input name="InvoiceCode" className="input-group" type="text" value={this.state.Name} required />
                            <br />
                            <label htmlFor="InvoiceCode">Mã nhà cung cấp</label>
                            <input name="InvoiceCode" className="input-group" type="text" value={this.state.Id} />
                            <br />
                            <label htmlFor="InvoiceCode">Số điện thoại</label>
                            <input name="InvoiceCode" className="input-group" type="tell" value={this.state.Phone} />
                            <br />
                            <label htmlFor="InvoiceCode">Email</label>
                            <input name="InvoiceCode" className="input-group" type="email" value={this.state.Email} />
                            <br />
                        </CardBody>
                    </Card>
                    <div className="d-flex justify-content-lg-center">
                        <ButtonGroup className="align-self-start  mt-1">
                            <Link to="/provider/create-provider">
                                <Button
                                    color="primary"
                                    className="mb-2 mr-2 px-3"
                                >
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