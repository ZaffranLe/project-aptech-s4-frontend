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
} from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { connect } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderMain title="Tạo sản phẩm mới" className="mb-5 mt-4" />
                <Row>
                    <Col lg={12}>
                        
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
