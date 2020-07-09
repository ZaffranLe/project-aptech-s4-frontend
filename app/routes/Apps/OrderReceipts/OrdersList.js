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
import { OrderReceiptActions } from "../../../redux/_actions/OrderReceipts/OrderReceiptsA";
import { UserActions } from "../../../redux/_actions/Users/UsersA";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { v1 } from "uuid";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import DatePicker from "react-datepicker";
import { AddonInput } from "../../Forms/DatePicker/components";
import Select from "react-select";

class ModifyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            IdEmployee: "",
            TotalPrice: 0,
            ChosenProducts: [],
            Phone: "",
            Name: "",
            Address: "",
            selectingProductId: ""
        };
    }

    componentDidMount() {
        const { orderReceipt, products } = this.props;
        if (orderReceipt) {
            const { IdEmployee, TotalPrice, ListProductId, Phone, Name, Address } = orderReceipt;
            const ChosenProducts = ListProductId.split(",").map((data) => {
                const productData = data.split("-");
                const product = products.find((item) => item["Product"]["Id"] == productData[0]);
                const quantity = parseInt(productData[1]);
                return {
                    productId: product["Product"]["Id"],
                    quantity,
                    totalPrice: product["Product"]["UnitPrice"] * quantity,
                    unitPrice: product["Product"]["UnitPrice"],
                };
            });
            this.setState({
                date: new Date(orderReceipt["Date"]),
                IdEmployee,
                TotalPrice,
                ChosenProducts,
                Phone,
                Name,
                Address,
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
        const { date, IdEmployee, Phone, Name, Address, TotalPrice, ChosenProducts } = this.state;
        const data = {
            Date: date,
            IdEmployee,
            TotalPrice,
            Phone,
            Name,
            Address,
            ListProductId: ChosenProducts.map((data) => `${data["productId"]}-${data["quantity"]}`).join(","),
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
        if (name == "productId") {
            const unitPrice = products.find((item) => item["Product"]["Id"] == e.target.value)["Product"]["UnitPrice"];
            ChosenProducts[idx]["unitPrice"] = unitPrice;
        }
        if (name == "quantity") {
            if (parseInt(e.target.value) < 1) return;
            ChosenProducts[idx]["totalPrice"] = ChosenProducts[idx]["unitPrice"] * parseInt(e.target.value);
        }
        const TotalPrice = ChosenProducts.map((product) => product["totalPrice"]).reduce(
            (sum, price) => sum + parseInt(price)
        );
        ChosenProducts[idx][name] = e.target.value;
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

    handleChangeProduct = (data) => {
        this.setState({
            selectingProductId: data.value,
        })
    }

    render() {
        const { isOpen, onClose, products, employees } = this.props;
        const { date, IdEmployee, Phone, Name, Address, TotalPrice, ChosenProducts } = this.state;
        return (
            <Modal size="lg" isOpen={isOpen}>
                <ModalHeader>Hóa đơn bán hàng</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Nhân viên</Label>
                                    <Input type="select" onChange={this.handleChange("IdEmployee")} value={IdEmployee}>
                                        <option value={null}>--Chọn nhân viên--</option>
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
                            <Col lg={6}>
                                <FormGroup>
                                    <Label>Ngày bán hàng</Label>
                                    <br />
                                    <DatePicker
                                        customInput={<AddonInput />}
                                        selected={date}
                                        onChange={this.handleChangeDate("date")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>SĐT</Label>
                                    <Input value={Phone} onChange={this.handleChange("Phone")} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Tên</Label>
                                    <Input value={Name} onChange={this.handleChange("Name")} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Địa chỉ giao hàng</Label>
                                    <Input value={Address} onChange={this.handleChange("Address")} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalHeader>Danh sách sản phẩm</ModalHeader>
                <ModalBody>
                    {ChosenProducts.length < products.length && (
                        <Row>
                            <Col lg={8}>
                                <Select
                                    options={products
                                        .filter(
                                            (product) =>
                                                !ChosenProducts.find(
                                                    (data) =>
                                                        data["productId"] == product["Product"]["Id"] &&
                                                        data["productId"] != item["productId"]
                                                )
                                        )
                                        .map((product) => {
                                            return {
                                                value: product["Product"]["Id"],
                                                label: `${product["Product"]["IdDisplay"]} - ${product["Product"]["Name"]}
                                                        - SL tồn: ${product["Product"]["Quantity"]}`,
                                            };
                                        })}
                                    onChange={this.handleChangeProduct}
                                />
                            </Col>
                            <Col lg={4}>
                                <Button color="info" onClick={this.handleAddProduct}>
                                    <i className="fa fa-fw fa-plus"></i> Thêm sản phẩm
                                </Button>
                            </Col>
                        </Row>
                    )}
                    <Table bordered hover striped className="mt-2">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th style={{ width: 1 }}></th>
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
                                                        {product["Product"]["IdDisplay"]} - {product["Product"]["Name"]}{" "}
                                                        - SL tồn: {product["Product"]["Quantity"]}
                                                    </option>
                                                ))}
                                        </Input>
                                    </td>
                                    <td>
                                        {item["productId"] && (
                                            <Input
                                                onChange={this.handleChangeChosenProduct(item, "quantity")}
                                                type="number"
                                                min={0}
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

class OrdersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderReceipt: "",
            modifyModal: false,
            randomKey: v1(),
        };
    }

    componentDidMount() {
        this.props.dispatch(OrderReceiptActions.getAllOrderReceipt());
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
                    title: "Đơn bán hàng",
                },
            ])
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isReload, isModified } = nextProps;
        if (isReload) {
            this.props.dispatch(OrderReceiptActions.getAllOrderReceipt());
        }
        if (isModified) {
            this.handleCloseModifyModal();
        }
    }

    handleCloseModifyModal = () => {
        this.setState({
            modifyModal: false,
            orderReceipt: "",
        });
    };

    handleOpenModifyModal = (orderReceipt = "") => {
        let randomKey = "";
        if (!orderReceipt) {
            randomKey = v1();
        }
        this.setState({
            modifyModal: true,
            orderReceipt,
            randomKey,
        });
    };

    handleSaveOrderReceipt = (data) => {
        const { orderReceipt } = this.state;
        if (orderReceipt) {
            this.props.dispatch(OrderReceiptActions.updateOrderReceipt(orderReceipt["Id"], data));
        } else {
            this.props.dispatch(OrderReceiptActions.createOrderReceipt(data));
        }
    };

    handleDeleteOrderReceipt = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá hóa đơn bán hàng này?")) {
            this.props.dispatch(OrderReceiptActions.deleteOrderReceipt(id));
        }
    };

    render() {
        const { orderReceipts, isLoading, products, employees } = this.props;
        const { orderReceipt, modifyModal, randomKey } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Hóa đơn bán hàng" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary" onClick={() => this.handleOpenModifyModal()}>
                            Tạo hóa đơn bán hàng mới
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {orderReceipts.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ngày bán</th>
                                            <th>Nhân viên</th>
                                            <th>Khách hàng</th>
                                            <th>Tổng tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderReceipts.map((orderReceipt, idx) => {
                                            return (
                                                <tr key={orderReceipt["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>
                                                        {moment(orderReceipt["Date"]).format("YYYY-MM-DD HH:mm:ss")}
                                                    </td>
                                                    <td>{orderReceipt["IdEmployee"]}</td>
                                                    <td>{orderReceipt["Name"]}</td>
                                                    <td>
                                                        {orderReceipt["TotalPrice"].toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="yellow"
                                                            size="sm"
                                                            onClick={() => this.handleOpenModifyModal(orderReceipt)}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>
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
                    key={orderReceipt ? orderReceipt["Id"] : randomKey}
                    orderReceipt={orderReceipt}
                    products={products}
                    employees={employees}
                    isOpen={modifyModal}
                    onClose={this.handleCloseModifyModal}
                    onSave={this.handleSaveOrderReceipt}
                />
                <Loading isLoading={isLoading} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ OrderReceiptsReducer }) => OrderReceiptsReducer;

export default connect(mapStateToProps, null)(OrdersList);
