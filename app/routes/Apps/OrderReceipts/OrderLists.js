import React, { Component } from 'react';
import { Container, Row, Col } from '../../../components';
import {
    ButtonToolbar,
    ButtonGroup,
    Button
} from './../../../components';
import { Link } from "react-router-dom";
import { HeaderMain } from '../../components/HeaderMain';
import OrderTable from './OrderTable';
//import CreateOrderReceipt from './CreateOrderReceipt/CreateOrderReceipt';

class OrderLists extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //this.props.dispatch();
    }

    render() {
        return (
            <div>
                <Container fluid={false}>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain
                            title="Đơn hàng"
                            className="mt-0"
                        />
                        <ButtonToolbar className="ml-auto">
                            <ButtonGroup className="align-self-start  mr-2">
                                <Link to="/order-receipt/create-order">
                                    <Button
                                        color="primary"
                                        className="mb-2 mr-2 px-3"
                                    >
                                        Tạo hóa đơn
                                    </Button>
                                </Link>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Link to="#">
                                    <Button outline className="mb-2 text-decoration-none align-self-start" color="secondary" >
                                        Trợ giúp
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Container>
                <Container  className="shadow">
                    <Row className="mb-5">
                        <Col>
                            <OrderTable />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OrderLists;