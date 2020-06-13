import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import _ from 'lodash';
import faker from 'faker/locale/en_US';

import {
    Avatar,
    Button,
    ButtonGroup,
    CustomInput,
    Row,
    Col
} from '../index';
import { CustomExportCSV } from './../../routes/Tables/ExtendedTable/components/CustomExportButton';
import { CustomSearch } from './../../routes/Tables/ExtendedTable/components/CustomSearch';
import { randomArray, randomAvatar } from './../../../app/utilities';

const generateRow = (id) => ({
    id,
    photo: randomAvatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: faker.name.jobType(),
    status: randomArray([
        'Active',
        'Suspended',
        'Waiting',
        'Unknown'
    ]),
    region: randomArray(['North', 'South', 'East', 'West']),
    earnings: 500 + Math.random() * 1000,
    earningsCurrencyIcon: randomArray([
        <i className="fa fa-fw fa-euro text-muted" key="cur_eur"></i>,
        <i className="fa fa-fw fa-dollar text-muted" key="cur_usd"></i>
    ]),
    lastLoginDate: faker.date.recent(),
    ipAddress: faker.internet.ip(),
    browser: 'Safari 9.1.1(11601.6.17)',
    os: 'OS X El Capitan',
    planSelected: randomArray(['Basic', 'Premium', 'Enterprise']),
    planEnd: faker.date.future()
});


class OrderListTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: _.times(10, generateRow)
        }
    }

    handleSelect(row, isSelected) {
        if (isSelected) {
            this.setState({ selected: [...this.state.selected, row.id] })
        } else {
            this.setState({
                selected: this.state.selected.filter(itemId => itemId !== row.id)
            })
        }
    }

    handleSelectAll(isSelected, rows) {
        if (isSelected) {
            this.setState({ selected: _.map(rows, 'id') })
        } else {
            this.setState({ selected: [] });
        }
    }

    handleAddRow() {
        const usersLength = this.state.users.length;

        this.setState({
            users: [
                generateRow(usersLength + 1),
                ...this.state.users
            ],
            selected: []
        })
    }

    createColumnDefinitions() {
        return [
            {
                dataField: 'id',
                text: 'Mã hóa đơn'               
            }, {
                dataField: 'role',
                text: 'Ngày lập hóa đơn'
            }, {
                dataField: 'lastName',
                text: 'Last Name'
            }, {
                dataField: 'role',
                text: 'Role'
            }, {
                dataField: 'status',
                text: 'Status'
            }, {
                dataField: 'region',
                text: 'Region'
            }, {
                dataField: 'earnings',
                text: 'Earnings'
            }
        ]; 
    }

    render() {

        const columnDefs = this.createColumnDefinitions();

        const expandRow = {
            renderer: row => (
                <Row>
                    <Col md={ 6 }>
                        <dl className="row">
                            <dt className="col-sm-6 text-right">Last Login</dt>
                            <dd className="col-sm-6">{ moment(row.lastLoginDate).format('DD-MMM-YYYY') }</dd>

                            <dt className="col-sm-6 text-right">IP Address</dt>
                            <dd className="col-sm-6">{ row.ipAddress }</dd>

                            <dt className="col-sm-6 text-right">Browser</dt>
                            <dd className="col-sm-6">{ row.browser }</dd>
                        </dl>
                    </Col>
                    <Col md={ 6 }>
                        <dl className="row">
                            <dt className="col-sm-6 text-right">Operating System</dt>
                            <dd className="col-sm-6">{ row.os }</dd>

                            <dt className="col-sm-6 text-right">Selected Plan</dt>
                            <dd className="col-sm-6">{ row.planSelected }</dd>

                            <dt className="col-sm-6 text-right">Plan Expiriation</dt>
                            <dd className="col-sm-6">{ moment(row.planEnd).format('DD-MMM-YYYY') }</dd>
                        </dl>
                    </Col>
                </Row>
            ),
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (
                    <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
                ) : (
                    <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                ),
            expandColumnRenderer: ({ expanded }) =>
                expanded ? (
                    <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
                ) : (
                    <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                )
        }

        const selectRowConfig = {
            mode: 'checkbox',
            selected: this.state.selected,
            onSelect: this.handleSelect.bind(this),
            onSelectAll: this.handleSelectAll.bind(this),
            selectionRenderer: ({ mode, checked, disabled }) => (
                <CustomInput type={ mode } checked={ checked } disabled={ disabled } />
            ),
            selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
                <CustomInput type={ mode } checked={ checked } innerRef={el => el && (el.indeterminate = indeterminate)} />
            )
        };

        return (
            <ToolkitProvider
                keyField="id"
                data={ this.state.users }
                columns={ columnDefs }
                search
                exportCSV
            >
            {
                props => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">                            
                            <div className="d-flex ml-auto">
                                <CustomSearch
                                    className="mr-2"
                                    { ...props.searchProps }
                                />                                
                            </div>
                        </div>
                        <BootstrapTable
                            classes="table-responsive-lg"
                            bordered={ false }
                            selectRow={ selectRowConfig }
                            expandRow={ expandRow }                        
                            responsive
                            hover
                            { ...props.baseProps }
                        />
                    </React.Fragment>
                )
            }
            </ToolkitProvider>
        );
    }
}

export default OrderListTable;