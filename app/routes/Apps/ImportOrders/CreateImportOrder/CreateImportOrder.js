import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from './../../../../components';
import { HeaderMain } from '../../../components/HeaderMain';
import { Table } from 'reactstrap';

class CreateImportOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CreatedBy: new Date(),
            Id: 1,
            Name: "Trương Vô Kỵ",
            EmployeeName: "Long Pham",
            Phone: "0966015228",
            Address: "Minh Khai - Hoai Duc - Ha Noi",
            ListProductId: "",
            TotalPrice: 8000,
            Note: "",
            Product: {
                Id: 0,
                Name: "",
                Description: "",
                Quantity: 0,
                UnitPrice: 0
            }
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
                <div>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain title={this.state.Id} tag="h4" className="mt-0" />
                        <div className="d-flex justify-content-end">
                            <input style={{ borderStyle: 'none', fontSize: 18, backgroundColor: 'inherit' }} type="text" value={this.state.CreatedBy} readOnly />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex pl-0">
                        <div className="col-md-9 pl-0">
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Thông tin nhà cung cấp
                                    </CardTitle>
                                    <div className="d-flex">
                                        <div className="mr-2" style={{ color: '#00a8f7' }}>
                                            <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                        </div>
                                        <div>
                                            <input style={{ borderStyle: 'none', color: '#00a8f7', fontSize: 16 }} type="text" value={this.state.Name} readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="d-flex col-12">
                                        <div className="col-6">
                                            <div>
                                                <div>
                                                    <spa>
                                                        <b>
                                                            ĐỊA CHỈ XUẤT HÀNG
                                                        </b>
                                                    </spa>
                                                </div>
                                                <div>
                                                    <input style={{ borderStyle: 'none' }} type="text" value={"Giao hàng"} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none' }} type="text" value={this.state.Phone} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none', width: '100%' }} type="text" value={"Hà Nội"} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none', width: '100%' }} type="text" value={this.state.Address} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                        <div   className="col-6">
                                            <div>
                                                <div>
                                                    <spa>
                                                        <b>
                                                            ĐỊA CHỈ XUẤT HÓA ĐƠN    
                                                        </b>
                                                    </spa>
                                                </div>
                                                <div>
                                                    <input style={{ borderStyle: 'none' }} type="text" value={"Giao hàng"} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none' }} type="text" value={this.state.Phone} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none', width: '100%' }} type="text" value={"Hà Nội"} readOnly />
                                                    <br />
                                                    <input style={{ borderStyle: 'none', width: '100%' }} type="text" value={this.state.Address} readOnly />
                                                </div>
                                            </div>
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
                                            {
                                                arr.map((value, idx) =>
                                                    <tr key={idx}>
                                                        <td style={{ color: '#00a8f7' }}>{value.Id}</td>
                                                        <td>{value.Name}</td>
                                                        <td>{value.Description}</td>
                                                        <td><input style={{ width: 50 }} type="number" value={value.Quantity} readOnly /></td>
                                                        <td><input style={{ width: 80 }} type="number" value={value.UnitPrice} readOnly /></td>
                                                        <td>{value.UnitPrice}</td>
                                                    </tr>
                                                )
                                            }

                                        </tbody>
                                        <tfoot style={{ fontSize: 16 }}>
                                            <tr>
                                                <td><b>Tiền phải trả: </b></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{this.state.TotalPrice}</td>
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
                                        Thông tin đơn nhập
                                </CardTitle>
                                <input style={{borderRadius: 10, width: 100, borderStyle: 'none', backgroundColor: 'gray', color: '#FFF', textAlign: 'center'}} value="Hoàn thành"/>
                                <hr/>
                                </CardBody>
                            </Card>
                            <Card className="mb-3" type="shadow">
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Ghi chú
                            </CardTitle>
                                    <textarea className="input-group" rows={5} cols={20} maxLength={200} defaultValue={""} placeholder={this.state.Note} readOnly />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateImportOrder;