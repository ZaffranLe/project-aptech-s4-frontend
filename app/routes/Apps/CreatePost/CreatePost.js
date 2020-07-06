import React from "react";
import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { connect } from "react-redux";
import { Row, Col, Button, Input, Form, Label, FormGroup, Container, Loading } from "./../../../components";

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }

    render() {
        const { isLoading } = this.props;
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default connect(null, null)(CreatePost);
