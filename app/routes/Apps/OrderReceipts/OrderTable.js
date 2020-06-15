import React, { Component } from 'react';
import { CustomSearch } from './../../../routes/Tables/ExtendedTable/components/CustomSearch';
import { Table } from 'reactstrap';
import './OrderTable.css';
import {
    ButtonGroup,
    Button
} from './../../../components';

class OrderTable extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        //const arr = [1,2,3];
        return (
            <div>
                <CustomSearch />
                <Table className="border-table" hover responsive>
                    <thead style={{ fontSize: 16 }}>
                        <tr>
                            <th style={{ width: 14 }}></th>
                            <th><b>Mã đơn hàng</b></th>
                            <th><b>Ngày tạo đơn</b></th>
                            <th><b>Tên khách hàng</b></th>
                            <th><b>Số điện thoại</b></th>
                            <th><b>Khách phải trả</b></th>
                            <th><b>Ghi chú hóa đơn</b></th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: 14 }}>
                        <tr>
                            <td onClick={() => window.location.href='/order-receipt/order-detail'}>
                                <i style={{cursor: 'pointer'}} className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                            </td>
                            <td style={{ color: '#00a8f7' }}>DH123</td>
                            <td>10/03/2020</td>
                            <td>Long</td>
                            <td>0966015228</td>
                            <td>99999999</td>
                            <td>Đéo có ghi chú</td>
                            <td>
                                <ButtonGroup>
                                    <Button 
                                        outline 
                                        className="mb-2 text-decoration-none align-self-start" 
                                        color="secondary" 
                                        onClick={() => window.location.href='/order-receipt/edit-order'}
                                        >
                                        Sửa đơn hàng
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>                        
                        {/* {arr.map((data, idx) => 
                            <tr key={idx}>{data}</tr>
                        )} */}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default OrderTable;