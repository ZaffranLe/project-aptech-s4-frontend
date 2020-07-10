import React from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Col,
    Table,
    Loading,
} from "./../../../components";
import { setupPage } from "./../../../components/Layout/setupPage";

import { HeaderMain } from "../../components/HeaderMain";
import { useSelector, useDispatch } from "react-redux";
import { TasksMedia } from "../../components/ProjectsDashboards/TasksMedia";
import EventsCarousel from "./EventsCarousel";
import { OrderReceiptActions } from "../../../redux/_actions/OrderReceipts/OrderReceiptsA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";

const ProjectsDashboard = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(OrderReceiptActions.getAllOrderReceipt());
        dispatch(NavbarActions.switchPage([]));
    }, []);

    const isLoading = useSelector((state) => state.OrderReceiptsReducer.isLoading);
    const orderReceipts = useSelector((state) => state.OrderReceiptsReducer.orderReceipts);

    const dailyOrders = orderReceipts
        .filter((receipt) => new Date(receipt["Date"]).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0))
        .map((receipt) => receipt["TotalPrice"]);
    const dailyProfit = dailyOrders.length > 0 ? dailyOrders.reduce((sum, price) => sum + price) : 0;
    const monthlyOrders = orderReceipts
        .filter((receipt) => {
            const date = new Date(receipt["Date"]);
            const currentDate = new Date();
            return date.getFullYear() == currentDate.getFullYear() && date.getMonth() == currentDate.getMonth();
        })
        .map((receipt) => receipt["TotalPrice"]);
    const monthlyProfit = monthlyOrders.length > 0 ? monthlyOrders.reduce((sum, price) => sum + price) : 0;
    

    return (
        <>
            <Row className="mb-5">
                <Col lg={12}>
                    <HeaderMain title="Tổng quan" className="mb-4 mb-lg-5" />
                </Col>
                <Col lg={6}>
                    <div className="hr-text hr-text-center my-2">
                        <span>Doanh thu</span>
                    </div>
                    <Row>
                        <Col xs={6} className="text-center">
                            <p className="text-center mb-0">
                                <i className="fa fa-circle text-primary mr-2"></i>
                                Trong ngày
                            </p>
                            <h4 className="mt-2 mb-0">
                                {dailyProfit.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </h4>
                        </Col>
                        <Col xs={6} className="text-center">
                            <p className="text-center mb-0">
                                <i className="fa fa-circle text-info mr-2"></i>
                                Trong tháng
                            </p>
                            <h4 className="mt-2 mb-0">
                                {monthlyProfit.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </h4>
                        </Col>
                    </Row>
                    <div className="hr-text hr-text-center mb-2 mt-3">
                        <span>Số đơn hàng</span>
                    </div>
                    <Row className="mb-4 mb-xl-0">
                        <Col xs={6} className="text-center">
                            <p className="text-center mb-0">
                                <i className="fa fa-circle text-warning mr-2"></i>
                                Trong ngày
                            </p>
                            <h4 className="mt-2 mb-0">{dailyOrders.length}</h4>
                        </Col>
                        <Col xs={6} className="text-center">
                            <p className="text-center mb-0">
                                <i className="fa fa-circle text-danger mr-2"></i>
                                Trong tháng
                            </p>
                            <h4 className="mt-2 mb-0">{monthlyOrders.length}</h4>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} className="mb-4 mb-lg-0">
                    <div className="hr-text hr-text-left my-2">
                        <span>Sản phẩm bán chạy</span>
                    </div>
                    <Table size="sm">
                        <tbody>
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg={3}>
                                            <i className="fa fa-fw fa-certificate fa-3x text-yellow"></i>
                                        </Col>
                                        <Col lg={9}>
                                            Tai nghe Razer Hyperbeast
                                            <br />
                                            19
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg={3}>
                                            <i
                                                className="fa fa-fw fa-certificate fa-3x"
                                                style={{ color: "#cfcfcf" }}
                                            ></i>
                                        </Col>
                                        <Col lg={9}>
                                            Chuột Logitech G102
                                            <br />
                                            15
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg={3}>
                                            <i
                                                className="fa fa-fw fa-certificate fa-3x"
                                                style={{ color: "#f5c17d" }}
                                            ></i>
                                        </Col>
                                        <Col lg={9}>
                                            Bàn phím cơ DareU EK87S
                                            <br />
                                            14
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg={3}>
                                            <i className="fa fa-fw fa-certificate fa-3x"></i>
                                        </Col>
                                        <Col lg={9}>
                                            Chuột không dây Steelseries G154
                                            <br />8
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg={3}>
                                            <i className="fa fa-fw fa-certificate fa-3x"></i>
                                        </Col>
                                        <Col lg={9}>
                                            Tai nghe Hypercloud X Sting Core
                                            <br />6
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6" className="mb-3">
                                Các bài viết mới nhất
                            </CardTitle>
                            <InputGroup>
                                <Input placeholder="Tìm kiếm bài viết..." />
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary" outline tag={Link} to="/apps/tasks/list">
                                        <i className="fa fa-search"></i>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </CardBody>
                        <ListGroup flush>
                            <ListGroupItem action>
                                <TasksMedia iconColor="success" />
                            </ListGroupItem>
                            <ListGroupItem action>
                                <TasksMedia iconColor="danger" id="2" />
                            </ListGroupItem>
                            <ListGroupItem action>
                                <TasksMedia iconColor="warning" id="3" />
                            </ListGroupItem>
                            <ListGroupItem action>
                                <TasksMedia id="4" />
                            </ListGroupItem>
                            <ListGroupItem action tag={Link} to="/apps/tasks/list" className="text-center">
                                Xem tất cả bài viết
                                <i className="fa fa-angle-right ml-2"></i>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6">Các sự kiện mới</CardTitle>
                        </CardBody>
                        <CardBody>
                            <EventsCarousel />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default setupPage({
    pageTitle: "Tổng quan",
})(ProjectsDashboard);
