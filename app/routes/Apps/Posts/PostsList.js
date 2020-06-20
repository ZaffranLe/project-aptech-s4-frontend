import React from "react";
import { connect } from "react-redux";
import {
    Row,
    Col,
    Button,
    Alert,
    Table,
    Container,
} from "./../../../components";
import { PostActions } from "../../../redux/_actions/Posts/PostsA";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";

class PostsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(PostActions.getAllPost());
    }

    handleDeletePost = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
            this.props.dispatch(PostActions.deletePost(id));
        }
    };

    render() {
        const { posts } = this.props;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Bài viết" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Button color="primary">Tạo bài viết mới</Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Container fluid>
                            {posts.length > 0 ? (
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tiêu đề</th>
                                            <th>Ngày tạo</th>
                                            <th>Ngày chỉnh sửa cuối</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post, idx) => {
                                            return (
                                                <tr key={post["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{post["Title"]}</td>
                                                    <td>
                                                        {moment(post["CreatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moment(post["UpdatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button color="yellow" size="sm">
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() =>
                                                                this.handleDeletePost(post["Id"])
                                                            }
                                                        >
                                                            Xoá
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ PostsReducer }) => PostsReducer;

export default connect(mapStateToProps, null)(PostsList);
