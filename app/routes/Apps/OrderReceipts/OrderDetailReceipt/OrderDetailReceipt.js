import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    ButtonGroup,
    Button
} from './../../../../components';
import { HeaderMain } from '../../../components/HeaderMain';
import { CustomSearch } from '../../../Tables/ExtendedTable/components/CustomSearch';
import { Table } from 'reactstrap';


class OrderDetailReceipt extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain title="SNO5198" tag="h4" className="mt-0" />
                        <div className="d-flex justify-content-end">
                            <input style={{ borderStyle: 'none', fontSize: 18, backgroundColor: 'inherit' }} type="text" value="15/06/2020 23:38" readOnly />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex pl-0">
                        <div className="col-md-9 pl-0">
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Thông tin khách hàng
                                </CardTitle>
                                    <div className="d-flex">
                                        <div className="mr-2" style={{ color: '#00a8f7' }}>
                                            <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                        </div>
                                        <div>
                                            <input style={{ borderStyle: 'none', color: '#00a8f7', fontSize: 16 }} type="text" value="Trương Thị Mai" readOnly />
                                            <br />
                                            <input style={{ borderStyle: 'none' }} type="tel" value="0966015228" readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                    </div>
                                    <div>
                                        <div>
                                            <spa>
                                                <b>
                                                    ĐỊA CHỈ GIAO HÀNG
                                            </b>
                                            </spa>
                                        </div>
                                        <div>
                                            <input style={{ borderStyle: 'none' }} type="text" value="Trương Thị Mai" readOnly />
                                            <br />
                                            <input style={{ borderStyle: 'none' }} type="text" value="0966015228" readOnly />
                                            <br />
                                            <input style={{ borderStyle: 'none', width: '100%' }} type="text" value="Minh Khai - Hoài Đức - Hà Nội" readOnly />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Thông tin sản phẩm
                                    </CardTitle>                                    
                                    <Table className="border-table" hover responsive>
                                        <thead style={{ fontSize: 16 }}>
                                            <tr>
                                                <th><b>Mã SKU</b></th>
                                                <th><b>Tên sản phẩm</b></th>
                                                <th><b>Đơn vị</b></th>
                                                <th><b>Số lượng</b></th>
                                                <th><b>Đơn giá</b></th>
                                                <th><b>Thành tiền</b></th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: 14 }}>
                                            <tr>
                                                <td style={{ color: '#00a8f7' }}>DH123</td>
                                                <td>Bim bim</td>
                                                <td>Bịch</td>
                                                <td><input style={{ width: 50 }} type="number" value="1" readOnly /></td>
                                                <td><input style={{ width: 80 }} type="number" value="30000" readOnly /></td>
                                                <td>30,000</td>
                                            </tr>
                                        </tbody>
                                        <tfoot style={{ fontSize: 16 }}>
                                            <tr>
                                                <td><b>Khách phải trả: </b></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>30,000</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Thông tin đơn hàng
                                    </CardTitle>
                                    <label htmlFor="InvoiceCode">Mã đơn hàng</label>
                                    <input name="InvoiceCode" className="input-group" type="text" value="SNO5198" readOnly/>
                                    <br />
                                    <label htmlFor="EmployeeName">Nhân viên</label>
                                    <input name="EmployeeName" className="input-group" type="text" value="Long Phạm" readOnly/>
                                </CardBody>
                            </Card>
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Ghi chú
                                </CardTitle>
                                    <textarea className="input-group" rows={5} cols={20} maxLength={200} defaultValue={""} placeholder={"Chưa có ghi chú..."} readOnly/>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetailReceipt;