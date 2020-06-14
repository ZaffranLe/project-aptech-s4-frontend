import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Container
} from './../../../../components';
import { HeaderMain } from '../../../components/HeaderMain';
import { CustomSearch } from '../../../Tables/ExtendedTable/components/CustomSearch';
import { Table, InputGroup } from 'reactstrap';

class CreateOrderReceipt extends Component {
    render() {
        return (
            <div>
                <Container fluid={false}>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain title="Tạo đơn hàng" className="mt-0" />
                    </div>
                </Container>
                <Container>
                    <div className="col-md-12 d-flex pl-0">
                        <div className="col-md-9 pl-0">
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Thông tin khách hàng
                            </CardTitle>
                                    <CustomSearch />
                                </CardBody>
                            </Card>
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Thông tin sản phẩm
                                    </CardTitle>
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
                                                <td>DH123</td>
                                                <td>Bim bim</td>
                                                <td>Bịch</td>
                                                <td><input style={{ width: 50 }} type="text"/></td>
                                                <td><input style={{ width: 50 }} type="text"/></td>
                                                <td>30000</td>
                                            </tr>                                            
                                        </tbody>
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
                </Container>
            </div>
        );
    }
}

export default CreateOrderReceipt;