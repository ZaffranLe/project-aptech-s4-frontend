import React, { Component } from 'react';
import { Container, Row, Col } from '../../../components';
import {
    ButtonToolbar,
    ButtonGroup,
    Button
} from './../../../components';
import { Link } from "react-router-dom";
import { HeaderMain } from '../../components/HeaderMain';
import { CustomSearch } from './../../../routes/Tables/ExtendedTable/components/CustomSearch';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton } from 'reactstrap';

class ImportOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        const obj = {
            Id: 1,
            ProviderName: "Ok!",
            Status: "Hoàn thành",            
            TotalPrice: 60000,   
            EmployeeName: "Du Du"         
        }

        const obj2 = {
            Id: 2,
            ProviderName: "No!",
            Status: "Hoàn thành",            
            TotalPrice: 60000,   
            EmployeeName: "Du Du"   
        }

        const arr = [obj, obj2];

        return (
            <div>
                <div>
                    <Container fluid={false}>
                        <div className="d-flex mt-3 mb-5">
                            <HeaderMain
                                title="Đơn nhập hàng"
                                className="mt-0"
                            />
                            <ButtonToolbar className="ml-auto">
                                <ButtonGroup className="align-self-start  mr-2">
                                    <Link to="/import-orders/create-import-order">
                                        <Button
                                            color="primary"
                                            className="mb-2 mr-2 px-3"
                                        >
                                            Tạo đơn nhập hàng
                                    </Button>
                                    </Link>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Link to="#">
                                        <Button outline className="mb-2 text-decoration-none align-self-start" color="secondary" >
                                            Trợ giúp
                                    </Button>
                                    </Link>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </Container>
                    <Container className="shadow">
                        <Row className="mb-5">
                            <Col>
                                <div className="d-flex">
                                    {/* <div>
                                        <Dropdown color="secondary" >
                                            <DropdownToggle>
                                                Lọc đơn hàng nhập
                                            </DropdownToggle>

                                            <DropdownMenu>
                                                <DropdownItem href="#/action-1">Action</DropdownItem>
                                                <DropdownItem href="#/action-2">Another action</DropdownItem>
                                                <DropdownItem href="#/action-3">Something else</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div> */}
                                    <div>
                                        
                                    </div>
                                </div>
                                <CustomSearch />
                                <Table className="border-table" hover responsive>
                                    <thead style={{ fontSize: 16 }}>
                                        <tr>                                       
                                            <th><b>Mã đơn </b></th>
                                            <th><b>Tên nhà cung cấp</b></th>
                                            <th><b>Trạng thái</b></th>
                                            <th><b>Tổng tiền</b></th>
                                            <th><b>Nhân viên tạo</b></th>                                            
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize: 14 }}>
                                        {arr.map((data, idx) =>
                                            <tr key={idx} >                                               
                                                <td style={{ color: '#00a8f7' }}>{data.Id}</td>
                                                <td>{data.ProviderName}</td>
                                                <td>{data.Status}</td>                                            
                                                <td>{data.TotalPrice}</td>
                                                <td>{data.EmployeeName}</td>                                                
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ImportOrders;