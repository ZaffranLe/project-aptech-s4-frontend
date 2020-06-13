import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from '../index';
import {
    AdvancedTableA,
    AdvancedTableB,
    BasicTable,
    BorderedTable,
    CellEdit,
    ClearSearch,
    LargeTable,
    SortTable
} from './../../routes/Tables/ExtendedTable/components';
import OrderListTable from './OrderListTable';

class OrderListBody extends Component {
    render() {
        
        return (
            <div>
                <Container>
                    <Row className="mb-5">
                        <Col>
                            <OrderListTable/>
                        </Col>
                    </Row>                                  
                </Container>
            </div>
        );
    }
}

OrderListBody.propTypes = {
    title: PropTypes.string
};

export default OrderListBody;