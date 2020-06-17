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
import { Table } from 'reactstrap';

class ProviderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            Name: "",
            Email: "",
            Phone: "",           
        }
    }
    
    render() {
        
        const obj = {
            Id: 1,
            Name: "Xiaomi",
            Email: "xiaomi@gmail.com",
            Phone: "09999999"
        }

        const obj2 = {
            Id: 2,
            Name: "Iphone",
            Email: "iphone@gmail.com",
            Phone: "0966601528"
        }

        const arr = [obj, obj2];

        return (
            <div>
                <div className="d-flex mt-3 mb-5">
                    <HeaderMain
                        title="Nhà cung cấp"
                        className="mt-0"
                    />
                    <ButtonToolbar className="ml-auto">
                        <ButtonGroup className="align-self-start  mr-2">
                            <Link to="/provider/create-provider">
                                <Button
                                    color="primary"
                                    className="mb-2 mr-2 px-3"
                                >
                                    Thêm nhà cung cấp
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
                <div className="shadow">
                <CustomSearch />
                <Table className="border-table" hover responsive>
                    <thead style={{ fontSize: 16 }}>
                        <tr>
                            <th><b>Mã nhà cung cấp</b></th>
                            <th><b>Tên nhà cung cấp</b></th>
                            <th><b>Email</b></th>
                            <th><b>Số điện thoại</b></th>                           
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: 14 }}>                        
                        {arr.map((data, idx) =>                                           
                            <tr key={idx} >                                
                                <td style={{ color: '#00a8f7' }}>{data.Id}</td>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{data.Phone}</td>                                                                
                            </tr>
                        )}
                    </tbody>
                </Table>
                </div>
            </div>
        );
    }
}

export default ProviderList;