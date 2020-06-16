import React, { Component } from 'react';
import { Container, Row, Col } from '../../../components';
import {
    ButtonToolbar,
    ButtonGroup,
    Button
} from './../../../components';

import { HeaderMain } from '../../components/HeaderMain';
import OrderTable from './OrderTable';
//import CreateOrderReceipt from './CreateOrderReceipt/CreateOrderReceipt';

class OrderLists extends Component {
    
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
                                <Button 
                                    color="primary" 
                                    className="mb-2 mr-2 px-3"
                                    onClick={() => window.location.href='/order-receipt/create-order'}
                                >
                                    Tạo hóa đơn
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button outline className="mb-2 text-decoration-none align-self-start" color="secondary" >
                                    Trợ giúp
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Container>
                <Container>
                    <Row className="mb-5">
                        <Col>
                            <OrderTable/>
                        </Col>
                    </Row>                                  
                </Container>
            </div>
        );
    }
}

export default OrderLists;