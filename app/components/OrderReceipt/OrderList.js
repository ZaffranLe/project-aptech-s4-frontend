import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderListHeader from './OrderListHeader';
import OrderListBody from './OrderListBody';


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        
        return (
            <div>
                <OrderListHeader/>
                <OrderListBody/>
            </div>
        );
    }
}

OrderList.PropTypes = {
    tieude: PropTypes.string
};

export default OrderList;



