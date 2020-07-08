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
import { UserActions } from "../../../redux/_actions/Users/UsersA";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
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
            IdEmployee: "",
            IdProvider: "",
            TotalPrice: 0,
            ChosenProducts: [],
        };
    }

    componentDidMount() {
        const { importReceipt } = this.props;
        if (importReceipt) {
            const { IdEmployee, IdProvider, TotalPrice, ListProductId } = importReceipt;
            this.setState({
                date: new Date(importReceipt["Date"]),
                IdEmployee,
                IdProvider,
                TotalPrice,
                ListProductId,
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

    handleAddProduct = () => {
        this.setState({
            ChosenProducts: [
                ...this.state.ChosenProducts,
                {
                    productId: "",
                    quantity: 0,
                    totalPrice: 0,
                    unitPrice: 0,
                },
            ],
        });
    };

    handleChangeChosenProduct = (product, name) => (e) => {
        const ChosenProducts = [...this.state.ChosenProducts];
        const { products } = this.props;
        const idx = ChosenProducts.indexOf(product);
        ChosenProducts[idx][name] = e.target.value;
        if (name == "productId") {
            const unitPrice = products.find((item) => item["Product"]["Id"] == e.target.value)["Product"]["UnitPrice"];
            ChosenProducts[idx]["unitPrice"] = unitPrice;
        }
        if (name == "quantity") {
            ChosenProducts[idx]["totalPrice"] = ChosenProducts[idx]["unitPrice"] * parseInt(e.target.value);
        }
        const TotalPrice = ChosenProducts.map(product => product["totalPrice"]).reduce((sum, price) => sum + parseInt(price));
        this.setState({
            ChosenProducts,
            TotalPrice,
        });
    };

    handleDeleteChosenProduct = (product) => {
        const ChosenProducts = [...this.state.ChosenProducts];
        ChosenProducts.splice(ChosenProducts.indexOf(product), 1);
        this.setState({
            ChosenProducts,
        });
    };

    render() {
        const { isOpen, onClose, products, employees, providers } = this.props;
        const { date, IdEmployee, IdProvider, TotalPrice, ChosenProducts } = this.state;
        return (
            <Modal size="lg" isOpen={isOpen}>
                <ModalHeader>Hóa đơn nhập hàng</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Nhân viên</Label>
                                    <Input type="select" onChange={this.handleChange("IdEmployee")} value={IdEmployee}>
                                        {employees.map((employee) => (
                                            <option
                                                key={employee["UserInfo"]["IdUserLogin"]}
                                                value={employee["UserInfo"]["IdUserLogin"]}
                                            >
                                                {employee["UserInfo"]["Name"]}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Nhà cung cấp</Label>
                                    <Input type="select" onChange={this.handleChange("IdProvider")} value={IdProvider}>
                                        {providers.map((provider) => (
                                            <option key={provider["Provider"]["Id"]} value={provider["Provider"]["Id"]}>
                                                {provider["Provider"]["Name"]}
                                            </option>
                                        ))}
                                    </Input>
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
                <ModalHeader>Danh sách sản phẩm</ModalHeader>
                <ModalBody>
                    {ChosenProducts.length < products.length && (
                        <Button color="info" onClick={this.handleAddProduct}>
                            <i className="fa fa-fw fa-plus"></i> Thêm sản phẩm
                        </Button>
                    )}
                    <Table bordered hover striped className="mt-2">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ChosenProducts.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <Input
                                            type="select"
                                            onChange={this.handleChangeChosenProduct(item, "productId")}
                                            value={item["productId"]}
                                        >
                                            <option value={null}>--Chọn sản phẩm--</option>
                                            {products
                                                .filter(
                                                    (product) =>
                                                        !ChosenProducts.find(
                                                            (data) =>
                                                                data["productId"] == product["Product"]["Id"] &&
                                                                data["productId"] != item["productId"]
                                                        )
                                                )
                                                .map((product) => (
                                                    <option
                                                        key={product["Product"]["Id"]}
                                                        value={product["Product"]["Id"]}
                                                    >
                                                        {product["Product"]["IdDisplay"]} - {product["Product"]["Name"]}
                                                    </option>
                                                ))}
                                        </Input>
                                    </td>
                                    <td>
                                        {item["productId"] && (
                                            <Input
                                                onChange={this.handleChangeChosenProduct(item, "quantity")}
                                                type="number"
                                                value={item["quantity"]}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {item["totalPrice"].toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </td>
                                    <td>
                                        <Button color="danger" onClick={() => this.handleDeleteChosenProduct(item)}>
                                            <i className="fa fa-fw fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="text-right">
                                    Tổng tiền
                                </td>
                                <td colSpan={2} className="text-red">
                                    {TotalPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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
        this.props.dispatch(UserActions.getAllUser());
        this.props.dispatch(ProductActions.getAllProduct());
        this.props.dispatch(
            NavbarActions.switchPage([
                {
                    link: "",
                    hasLink: false,
                    title: "Đơn hàng",
                },
                {
                    link: "",
                    hasLink: false,
                    title: "Đơn nhập hàng",
                },
            ])
        );
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
        const { importReceipts, isLoading, products, employees, providers } = this.props;
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
                    products={products}
                    employees={employees}
                    providers={providers}
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
