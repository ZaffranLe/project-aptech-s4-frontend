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

const ProductsCardGrid = (props) => {
    const { product } = props;
    return (
        <React.Fragment>
            {/* START Card */}
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={6}>
                            <CardTitle>{product["Product"]["IdDisplay"]}</CardTitle>
                        </Col>
                        <Col lg={6}>
                            <div className="d-flex">
                                <ButtonGroup size="sm" className="ml-auto">
                                    <UncontrolledButtonDropdown className="ml-auto">
                                        <DropdownToggle color="link" size="sm" className="pt-0">
                                            <i className="fa fa-fw fa-bars pr-0" />
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <i className="fa fa-fw fa-pencil mr-2"></i>
                                                Sửa
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <i className="fa fa-fw fa-trash mr-2"></i>
                                                Xóa
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                {product["ListImages"].length > 0 && <CardImg width="100%" src={product["ListImages"][0]["ImageUrl"]} alt="Sample img" />}
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
