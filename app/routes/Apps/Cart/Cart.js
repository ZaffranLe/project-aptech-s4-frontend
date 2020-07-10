import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Form, FormGroup, Label, Input, Loading, Table, Button } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { CartActions } from "../../../redux/_actions/Cart/CartA";

const Cart = (props) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.CartReducer.products);
    const isLoading = useSelector((state) => state.CartReducer.isLoading);

    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");

    React.useEffect(() => {
        dispatch(
            NavbarActions.switchPage([
                {
                    hasLink: false,
                    link: "",
                    title: "Giỏ hàng",
                },
            ])
        );
    }, []);

    const handleChangeQuantity = (id) => (e) => {
        dispatch(CartActions.changeQuantity(id, parseInt(e.target.value)));
    };

    const handleRemoveProduct = (id) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?")) {
            dispatch(CartActions.removeProductFromCart(id));
        }
    };

    const handleRefreshCart = () => {
        if (window.confirm("Bạn có chắc muốn làm mới giỏ hàng?")) {
            dispatch(CartActions.refreshCart());
        }
    };

    const handleOrder = () => {
        const data = {
            Name: name,
            Email: email,
            Phone: phone,
            Address: address,
            ListProduct: products
                .map((product) => `${product["Product"]["Id"]}-${product["buyingQuantity"]}`)
        };
        dispatch(CartActions.order(data));
    };

    return (
        <>
            <Row>
                <Col lg={12}>
                    <HeaderMain title="Giỏ hàng" className="mb-5 mt-4" />
                </Col>
                <Col lg={12}>
                    <Container className="table-bordered p-3">
                        <Form>
                            <Row form>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Tên khách hàng</Label>
                                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Số điện thoại</Label>
                                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label>Địa chỉ giao hàng</Label>
                                        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col lg={12}>
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th style={{ width: 1 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, idx) => (
                                            <tr key={product["Product"]["Id"]}>
                                                <td>
                                                    <Row>
                                                        {product["ListImages"].length > 0 && (
                                                            <Col lg={4}>
                                                                <img
                                                                    src={product["ListImages"][0]["ImageUrl"]}
                                                                    width="100"
                                                                    height="100"
                                                                />
                                                            </Col>
                                                        )}
                                                        <Col lg={8}>
                                                            Mã SP: {product["Product"]["IdDisplay"]}
                                                            <br />
                                                            {product["Product"]["Name"]}
                                                            <br />
                                                            Đơn giá:{" "}
                                                            <span className="text-danger">
                                                                <b>
                                                                    {product["Product"]["UnitPrice"].toLocaleString(
                                                                        "vi-VN",
                                                                        {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        }
                                                                    )}
                                                                </b>
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Input
                                                        defaultValue={product["buyingQuantity"]}
                                                        type="number"
                                                        min={1}
                                                        onChange={handleChangeQuantity(product["Product"]["Id"])}
                                                    />
                                                </td>
                                                <td>
                                                    {product["totalPrice"].toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </td>
                                                <td>
                                                    <Button
                                                        color="danger"
                                                        onClick={() => handleRemoveProduct(product["Product"]["Id"])}
                                                    >
                                                        <i className="fa fa-fw fa-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={2} className="text-right">
                                                Tổng tiền:
                                            </td>
                                            <td colSpan={2} className="text-danger">
                                                {products.length > 0 &&
                                                    products
                                                        .map((item) => item["totalPrice"])
                                                        .reduce((sum, price) => sum + price)
                                                        .toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button color="info" onClick={handleRefreshCart} className="mr-2">
                                    <i className="fa fa-fw fa-refresh"></i> Làm mới giỏ hàng
                                </Button>
                                <Button color="primary" onClick={handleOrder}>
                                    <i className="fa fa-fw fa-shopping-cart"></i> Đặt hàng
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default Cart;
