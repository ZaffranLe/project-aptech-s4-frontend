import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { setupPage } from "./../../../components/Layout/setupPage";
import EventsCarousel from "../../Dashboards/Projects/EventsCarousel";
import { ProductsCardGrid } from "../../components/Products/ProductsCardGrid";
import { HeaderMain } from "../../components/HeaderMain";
import { ProductActions } from "../../../redux/_actions/Products/ProductsA";
import { ManufacturerActions } from "../../../redux/_actions/Manufacturers/ManufacturersA";
import _ from "lodash";

const Home = (props) => {
    const pageConfig = props.pageConfig;
    const products = useSelector((state) => state.ProductsReducer.products);
    const manufacturers = useSelector((state) => state.ManufacturersReducer.manufacturers);
    const isLoading = useSelector((state) => state.ProductsReducer.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProductActions.getAllProduct());
        dispatch(ManufacturerActions.getAllManufacturer());
        pageConfig.setElementsVisibility({
            sidebarHidden: true,
        });

        return () => {
            pageConfig.setElementsVisibility({
                sidebarHidden: false,
            });
        };
    }, []);

    return (
        <>
            <Row>
                <Col lg={12}>
                    <EventsCarousel height="600" />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col lg={12}>
                    <Alert color="danger" style={{ width: "100%" }}>
                        <h3>
                            <i className="fa fa-fw fa-fire text-danger"></i> Sản phẩm nổi bật
                        </h3>
                    </Alert>
                </Col>
            </Row>
            <Row>
                {[...products]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item) => (
                        <Col lg={3} className="mt-1" key={item["Product"]["Id"]}>
                            <ProductsCardGrid product={item} />
                        </Col>
                    ))}
            </Row>
            <Row className="mt-5">
                <Col lg={12}>
                    <Alert color="info" style={{ width: "100%" }}>
                        <h3>
                            <i className="fa fa-fw fa-clock-o text-info"></i> Sản phẩm mới
                        </h3>
                    </Alert>
                </Col>
            </Row>
            <Row>
                {_.reverse(
                    _.sortBy(products, function (product) {
                        return product["Product"]["CreatedAt"];
                    })
                )
                    .slice(0, 4)
                    .map((item) => (
                        <Col lg={3} className="mt-1" key={item["Product"]["Id"]}>
                            <ProductsCardGrid product={item} />
                        </Col>
                    ))}
            </Row>
            <Row className="mt-5">
                <Col lg={12}>
                    <Alert color="primary" style={{ width: "100%" }}>
                        <h3>Thương hiệu của chúng tôi</h3>
                    </Alert>
                </Col>
            </Row>
            <Row>
                {[...manufacturers]
                    .filter((item) => item["ListImages"].length > 0)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item) => (
                        <Col lg={3} className="mt-1" key={item["Manufacturer"]["Id"]}>
                            <img
                                src={item["ListImages"][0]["ImageUrl"]}
                                width="100%"
                                height="300px"
                            />
                        </Col>
                    ))}
            </Row>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default setupPage({
    pageTitle: "Trang chủ",
})(Home);
