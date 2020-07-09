import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    UncontrolledTooltip,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    CardFooter,
    CustomInput,
    ButtonGroup,
    DropdownItem,
    CardImg,
    Row,
    Col,
    CardSubtitle,
} from "./../../../components";
import updateImg from "./update.png";

const ProductsCardGrid = (props) => {
    const { product } = props;
    return (
        <React.Fragment>
            {/* START Card */}
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={12}>
                            <CardTitle>{product["Product"]["IdDisplay"]}</CardTitle>
                        </Col>
                    </Row>
                </CardBody>
                <CardImg
                    width="100%"
                    height="200px"
                    src={product["ListImages"].length > 0 ? product["ListImages"][0]["ImageUrl"] : updateImg}
                    alt="Sample img"
                />
                <CardBody>
                    <CardTitle>{product["Product"]["Name"]}</CardTitle>
                    <CardSubtitle className="text-danger font-weight-bold" style={{ fontSize: 20 }}>
                        {product["Product"]["UnitPrice"].toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </CardSubtitle>
                </CardBody>
                <CardFooter className="bt-0 text-center">
                    <Row>
                        <Col lg={4}>
                            {product["Product"]["Quantity"] > 0 ? (
                                <Button disabled color="link" className="text-success">
                                    <i className="fa fa-fw- fa-check"></i> Còn hàng
                                </Button>
                            ) : (
                                <Button disabled color="link" className="text-primary">
                                    <i className="fa fa-fw fa-phone"></i> Liên hệ
                                </Button>
                            )}
                        </Col>
                        <Col lg={8}>
                            <Button color="link" className="float-right">
                                <i className="fa fa-fw fa-shopping-cart"></i> Thêm vào giỏ hàng
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
            {/* END Card */}
        </React.Fragment>
    );
};

export { ProductsCardGrid };
