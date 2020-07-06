import React from "react";
import { connect } from "react-redux";
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
    Button,
    Alert,
    Table,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Loading,
} from "./../../../components";
import { ImportReceiptActions } from "../../../redux/_actions/ImportReceipts/ImportReceiptsA";
import { ProviderActions } from "../../../redux/_actions/Providers/ProvidersA";
import { v1 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import DatePicker from "react-datepicker";
import { AddonInput } from "../../Forms/DatePicker/components";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        const { importReceipt } = this.props;
        if (importReceipt) {
            this.setState({
                date: new Date(importReceipt["Date"]),
            });
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleChangeDate = (name) => (date) => {
        this.setState({
            [name]: date,
        });
    };

    handleSave = () => {
        const { date } = this.state;
        const data = {
            Date: date,
        };
        this.props.onSave(data);
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { date } = this.state;
        return (
            <Modal size="lg" isOpen={isOpen} toggle={onClose}>
                <ModalHeader>Hóa đơn nhập hàng</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Nhân viên</Label>
                                    <Input />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Nhà cung cấp</Label>
                                    <Input />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Ngày nhập hàng</Label>
                                    <br />
                                    <DatePicker
                                        customInput={<AddonInput />}
                                        selected={date}
                                        onChange={this.handleChangeDate("date")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>
                        Lưu
                    </Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class ImportReceiptsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            importReceipt: "",
            modifyModal: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(ImportReceiptActions.getAllImportReceipt());
        this.props.dispatch(ProviderActions.getAllProvider());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(ImportReceiptActions.getAllImportReceipt());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            importReceipt: "",
        });
    };

    handleOpenModifyModal = (importReceipt = "") => {
        this.setState({
            modifyModal: true,
            importReceipt,
        });
    };

    handleSaveImportReceipt = (data) => {
        const { importReceipt } = this.state;
        if (importReceipt) {
            this.props.dispatch(ImportReceiptActions.updateImportReceipt(importReceipt["ImportReceipt"]["Id"], data));
        } else {
            this.props.dispatch(ImportReceiptActions.createImportReceipt(data));
        }
    };

    handleDeleteImportReceipt = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá hóa đơn nhập hàng này?")) {
            this.props.dispatch(ImportReceiptActions.deleteImportReceipt(id));
        }
    };

    render() {
        const { importReceipts, isLoading } = this.props;
        const { importReceipt, modifyModal } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Hóa đơn nhập hàng" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo hóa đơn nhập hàng mới
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {importReceipts.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ngày nhập</th>
                                            <th>Nhân viên</th>
                                            <th>Nhà cung cấp</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importReceipts.map((importReceipt, idx) => {
                                            return (
                                                <tr key={importReceipt["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>
                                                        {moment(importReceipt["Date"]).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>{importReceipt["IdEmployee"]}</td>
                                                    <td>{importReceipt["IdProvider"]}</td>
                                                    <td>
                                                        {importReceipt["TotalPrice"].toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            ) : (
                                <Alert color="warning">Chưa có dữ liệu để hiển thị</Alert>
                            )}
                        </Container>
                    </Col>
                </Row>
                <ModifyModal
                    key={importReceipt["Id"] || v1()}
                    importReceipt={importReceipt}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveImportReceipt}
                />
                <Loading isLoading={isLoading} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ImportReceiptsReducer }) => ImportReceiptsReducer;

export default connect(mapStateToProps, null)(ImportReceiptsList);
