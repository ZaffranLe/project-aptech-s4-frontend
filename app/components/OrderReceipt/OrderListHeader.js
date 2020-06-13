import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    ButtonToolbar,
    ButtonGroup,
    Button
} from '../index';

import { HeaderMain } from '../../routes/components/HeaderMain';


class OrderListHeader extends Component {

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
                                <Button color="primary" className="mb-2 mr-2 px-3">
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
            </div>
        );
    }
}

OrderListHeader.propTypes = {
    title: PropTypes.string
};

export default OrderListHeader;