import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import {
    Row,
    Col,
    Button,
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselControl,
    Alert,
    Container,
    Table,
    Loading,
    Card,
    CardHeader,
    CardBody,
} from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { CartActions } from "../../../redux/_actions/Cart/CartA";
import moment from "moment";
import { ProductsCardGrid } from "../../components/Products/ProductsCardGrid";

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.ProductsReducer.product);
    const products = useSelector((state) => state.ProductsReducer.products);
    const isLoading = useSelector((state) => state.ProductsReducer.isLoading);
    const id = props.match.params.id;

    React.useEffect(() => {
        dispatch(ProductActions.getAllProduct());
    }, []);

    React.useEffect(() => {
        dispatch(ProductActions.getProduct(id));
    }, [id]);

    React.useEffect(() => {
        if (product != "") {
            dispatch(
                NavbarActions.switchPage([
                    {
                        hasLink: true,
                        link: "/products",
                        title: "Sản phẩm",
                    },
                    {
                        hasLink: false,
                        link: "",
                        title: product["Product"]["Name"],
                    },
                ])
            );
        }
    }, [product]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        if (product) {
            const nextIndex = activeIndex === product["ListImages"].length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(nextIndex);
        } else return;
    };

    const previous = () => {
        if (animating) return;
        if (product) {
            const nextIndex = activeIndex === 0 ? product["ListImages"].length - 1 : activeIndex - 1;
            setActiveIndex(nextIndex);
        } else return;
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = product
        ? product["ListImages"].map((img) => {
              return (
                  <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={img.Id}>
                      <img src={img.ImageUrl} alt={"ProductImg"} width="100%" />
                  </CarouselItem>
              );
          })
        : [];

    const productsInCart = useSelector((state) => state.CartReducer.products);

    const handleAddProductToCart = (data) => {
        if (!productsInCart.find((item) => item["Product"]["Id"] == data["Product"]["Id"])) {
            const productToAdd = {
                ...data,
                buyingQuantity: 1,
                totalPrice: data["Product"]["UnitPrice"],
            };
            dispatch(CartActions.addProductToCart(productToAdd));
        }
    };

    return (
        <>
            {product && (
                <>
                    <Row>
                        <Col lg={12}>
                            <HeaderMain title={product["Product"]["Name"]} className="mb-5 mt-4" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={9}>
                            <Row>
                                <Col lg={5}>
                                    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                                        <CarouselIndicators
                                            items={product ? product["ListImages"] : []}
                                            activeIndex={activeIndex}
                                            onClickHandler={goToIndex}
                                        />
                                        {slides}
                                        <CarouselControl
                                            direction="prev"
                                            directionText="Previous"
                                            onClickHandler={previous}
                                        />
                                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                    </Carousel>
                                </Col>
                                <Col lg={7} className="p-2 table-bordered">
                                    <Table hover striped borderless>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>Mã SP: {product["Product"]["IdDisplay"]}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <b>Thông số sản phẩm</b>
                                                </td>
                                            </tr>
                                            {/* #Properties map */}
                                            <tr>
                                                <td colSpan={2}>
                                                    Bảo hành:{" "}
                                                    <span className="text-danger">
                                                        {product["Product"]["SupportDuration"]} tháng
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Container className="p-2">
                                        <h3>
                                            Giá:{" "}
                                            <span className="text-danger">
                                                {product["Product"]["UnitPrice"].toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>{" "}
                                            [Đã có VAT]
                                        </h3>
                                        <Button size="lg" color="danger" onClick={() => handleAddProductToCart(product)}>
                                            <i className="fa fa-fw fa-shopping-cart"></i> Cho vào giỏ hàng
                                        </Button>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Alert color="info" style={{ width: "100%" }}>
                                    <h5>Một vài sản phẩm tương tự</h5>
                                </Alert>
                                {[...products]
                                    .filter(
                                        (item) =>
                                            item["Product"]["Id"] != product["Product"]["Id"] &&
                                            item["Product"]["IdProductType"] == product["Product"]["IdProductType"]
                                    )
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, 4)
                                    .map((item) => (
                                        <Col lg={3} className="mt-2" key={item["Product"]["Id"]}>
                                            <ProductsCardGrid product={item} smallView={true} />
                                        </Col>
                                    ))}
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardHeader style={{ backgroundColor: "teal", color: "white" }}>
                                            <i className="fa fa-fw fa-money"></i> Chính sách bán hàng
                                        </CardHeader>
                                        <CardBody>
                                            <ul>
                                                <li>Sản phẩm chính hãng 100%</li>
                                                <li>Bán hàng online toàn quốc</li>
                                                <li>Trả bảo hành tận nơi sử dụng</li>
                                                <li>Bảo hành tận nơi cho doanh nghiệp</li>
                                                <li>Giá cạnh tranh nhất thị trường</li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col lg={12}>
                                    <Card>
                                        <CardHeader style={{ backgroundColor: "teal", color: "white" }}>
                                            <i className="fa fa-fw fa-truck"></i> Chính sách giao hàng
                                        </CardHeader>
                                        <CardBody>
                                            <ul>
                                                <li>Trả tiền khi nhận hàng COD</li>
                                                <li>Miễn phí giao hàng bán kính 5km với đơn hàng trên 500.000đ</li>
                                                <li>
                                                    Miễn phí giao hàng 300km với khách hàng doanh nghiệp, dự án, game
                                                    net
                                                </li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
            <Loading isLoading={isLoading} />
        </>
    );
};

export default ProductDetail;
