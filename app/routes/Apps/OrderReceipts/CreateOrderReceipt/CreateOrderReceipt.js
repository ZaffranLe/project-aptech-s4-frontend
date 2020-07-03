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

class CreateOrderReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            EmployeeName: "",
            Note: "",
            TotalPrice: 0
        }
    }

    render() {
        const obj = {
            Id: 1,
            Name: "Bim bim",
            Description: "Gói",
            Quantity: 1,
            UnitPrice: 5000
        }

        const obj2 = {
            Id: 2,
            Name: "Ngô cay",
            Description: "Gói",
            Quantity: 1,
            UnitPrice: 3000
        }

        const arr = [obj, obj2];

        return (
            <div>
                <div className="d-flex mt-3 mb-5">
                    <HeaderMain title="Tạo đơn hàng" className="mt-0" />
                </div>
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
                                        {
                                            arr.map((value, idx) =>
                                                <tr key={idx}>
                                                    <td style={{ color: '#00a8f7' }}>{value.Id}</td>
                                                    <td>{value.Name}</td>
                                                    <td>{value.Description}</td>
                                                    <td><input style={{ width: 50 }} type="number" value={value.Quantity} /></td>
                                                    <td><input style={{ width: 80 }} type="number" value={value.UnitPrice} /></td>
                                                    <td>{value.UnitPrice}</td>
                                                    <td><h4 style={{ cursor: "pointer" }}><span aria-hidden="true"><b>×</b></span></h4></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    <tfoot style={{ fontSize: 16 }}>
                                        <tr>
                                            <td><b>Khách phải trả: </b></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{this.state.TotalPrice}</td>
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
                                <input name="InvoiceCode" className="input-group" value={this.state.Id} type="text" />
                                <br />
                                <label htmlFor="EmployeeName">Nhân viên</label>
                                <input name="EmployeeName" className="input-group" value={this.state.EmployeeName} type="text" />
                            </CardBody>
                        </Card>
                        <Card className="mb-3" type="shadow">
                            <CardBody>
                                <CardTitle tag="h5">
                                    Ghi chú
                                     </CardTitle>
                                <textarea className="input-group" rows={5} cols={20} maxLength={200} defaultValue={this.state.Note} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateOrderReceipt;