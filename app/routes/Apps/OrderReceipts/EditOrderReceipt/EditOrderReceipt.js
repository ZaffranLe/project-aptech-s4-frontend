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


class EditOrderReceipt extends Component {
    render() {
        return (
            <div>
                <div className="d-flex mt-3 mb-5">
                    <HeaderMain title="Sửa đơn hàng" className="mt-0" />
                </div>
                <div className="col-md-12 d-flex pl-0">
                    <div className="col-md-9 pl-0">
                        <Card className="mb-3" type="shadow">
                            <CardBody>
                                <CardTitle tag="h4">
                                    Thông tin khách hàng
                                </CardTitle>
                                <div className="d-flex">
                                    <div className="mr-2" style={{ color: '#00a8f7'}}>
                                        <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <input style={{ borderStyle: 'none', color: '#00a8f7', fontSize: 16 }} type="text" value="Trương Thị Mai" />
                                        <br/>
                                        <input style={{ borderStyle: 'none'}} type="tel" value="0966015228" />                            
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
                                        <input style={{ borderStyle: 'none'}} type="text" value="Trương Thị Mai" readOnly/>
                                        <br/>
                                        <input style={{ borderStyle: 'none'}} type="text" value="0966015228" readOnly/>
                                        <br/>
                                        <input style={{ borderStyle: 'none', width: '100%'}} type="text" value="Minh Khai - Hoài Đức - Hà Nội"/>
                                        <br/>
                                        <input style={{ borderStyle: 'none', color: '#00a8f7', backgroundColor: '#FFF'}} type="button" value="Thay đổi địa chỉ giao hàng"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="mb-3" type="shadow">
                            <CardBody>
                                <div className="d-flex">
                                    <CardTitle tag="h4">
                                        Thông tin sản phẩm
                                        </CardTitle>
                                    <ButtonGroup className="ml-auto">
                                        <Button outline className="mb-2 text-decoration-none align-self-start" color="secondary" >
                                            Kiểm tra tồn kho
                                            </Button>
                                    </ButtonGroup>
                                </div>
                                <CustomSearch />
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
                                            <td><input style={{ width: 50 }} type="number" /></td>
                                            <td><input style={{ width: 80 }} type="number" /></td>
                                            <td>30,000</td>
                                            <td><h4 style={{ cursor: "pointer" }}><span aria-hidden="true"><b>×</b></span></h4></td>
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
                                        <tr style={{ width: '400%' }} className="d-flex justify-content-center">
                                            <ButtonGroup>
                                                <Button outline className="mb-2 text-decoration-none align-self-start" color="secondary" >
                                                    Thêm sản phẩm ngay
                                                    </Button>
                                            </ButtonGroup>
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
                                <input name="InvoiceCode" className="input-group" type="text" />
                                <br/>
                                <label htmlFor="EmployeeName">Nhân viên</label>
                                <input name="EmployeeName" className="input-group" type="text" />
                            </CardBody>
                        </Card>
                        <Card className="mb-3" type="shadow">
                            <CardBody>
                                <CardTitle tag="h5">
                                    Ghi chú
                                     </CardTitle>
                                <textarea className="input-group" rows={5} cols={20} maxLength={200} defaultValue={""} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditOrderReceipt;