import React from "react";
import SunEditor from "suneditor-react";
import { connect } from "react-redux";
import { Row, Col, Button, Input, Form, Label, FormGroup, Container, Loading } from "./../../../components";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { Private } from "../../../components/Private";
import { PERMISSIONS } from "../../../utils/_permissions"

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }

    componentDidMount() {
        this.props.dispatch(
            NavbarActions.switchPage([
                {
                    hasLink: false,
                    link: "",
                    title: "Bài viết",
                },
                {
                    hasLink: false,
                    link: "",
                    title: "Đăng bài viết mới",
                },
            ])
        );
    }

    render() {
        const { isLoading } = this.props;
        return (
            <Private PERMISSION={PERMISSIONS.CREATE_POST}>
                <Row>
                    <Col lg={12}>
                        <Container className="table-bordered">
                            <Form>
                                <FormGroup>
                                    <Label>Tiêu đề:</Label>
                                    <Input />
                                </FormGroup>
                            </Form>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    <Container className="table-bordered">
                        <SunEditor />
                    </Container>
                    </Col>
                </Row>
                <Loading isLoading={isLoading} />
            </Private>
        );
    }
}

export default connect(null, null)(CreatePost);
