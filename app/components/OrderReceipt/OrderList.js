import React, { Component } from 'react';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div>
                { this.props.tieude}
            </div>
        );
    }
}

export default OrderList;



/*

import React from 'react';


const OrderList = () => {
    
    return (
        <div>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>
    );

} 

export default OrderList;
*/