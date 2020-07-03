import React, { Component } from 'react';
import { CustomSearch } from './../../../routes/Tables/ExtendedTable/components/CustomSearch';
import { Table } from 'reactstrap';
import './OrderTable.css';
import {
    ButtonGroup,
    Button
} from './../../../components';
import { Link } from "react-router-dom";

class OrderTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
            CreatedBy: new Date(),
            CustomerName: "",
            Phone: "",
            TotalPrice: 0,
            Note: ""
        }
    }

    render() {
        const obj = {
            Id: 1,
            CreatedBy: "31/3/2019",
            CustomerName: "Long",
            Phone: "0966015228",
            TotalPrice: 60000,
            Note: "Không có"
        }

        const obj2 = {
            Id: 2,
            CreatedBy: "31/3/2019",
            CustomerName: "Hoa",
            Phone: "0123465485",
            TotalPrice: 666667,
            Note: "Không có"
        }

        const arr = [obj, obj2];
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
                        {arr.map((data, idx) =>                                           
                            <tr key={idx} >
                                <td>
                                    <Link to="/order-receipt/order-detail">
                                        <i style={{ cursor: 'pointer' }} className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                                    </Link>
                                </td>
                                <td style={{ color: '#00a8f7' }}>{data.Id}</td>
                                <td>{data.CreatedBy}</td>
                                <td>{data.CustomerName}</td>
                                <td>{data.Phone}</td>
                                <td>{data.TotalPrice}</td>
                                <td>{data.Note}</td>
                                <td>
                                    <ButtonGroup>
                                        <Link to="/order-receipt/edit-order">
                                            <Button
                                                outline
                                                className="mb-2 text-decoration-none align-self-start"
                                                color="secondary"
                                            >
                                                Sửa đơn hàng
                                        </Button>
                                        </Link>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default OrderTable;