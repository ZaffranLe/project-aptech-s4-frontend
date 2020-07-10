import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Alert, Table, Container, Loading } from "./../../../components";
import { PostActions } from "../../../redux/_actions/Posts/PostsA";
import { NavbarActions } from "../../../redux/_actions/Navbar/NavbarA";
import { HeaderMain } from "../../components/HeaderMain";
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Private } from "../../../components/Private";
import { PERMISSIONS } from "../../../utils/_permissions"

class PostsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(PostActions.getAllPost());
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

    handleDeletePost = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
            this.props.dispatch(PostActions.deletePost(id));
        }
    };

    render() {
        const { posts, isLoading } = this.props;
        return (
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_POST}>
                <Row>
                    <Col lg={9}>
                        <HeaderMain title="Bài viết" className="mb-5 mt-4" />
                    </Col>
                    <Col lg={3} className="text-right mt-4">
                        <Link to="/apps/posts/create">
                            <Button color="primary">Tạo bài viết mới</Button>
                        </Link>
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
                                                    <td>{moment(post["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>{moment(post["UpdatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>
                                                        <Button color="yellow" size="sm">
                                                            Chỉnh sửa
                                                        </Button>{" "}
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            onClick={() => this.handleDeletePost(post["Id"])}
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
                <Loading isLoading={isLoading} />
            </Private>
        );
    }
}

const mapStateToProps = ({ PostsReducer }) => PostsReducer;

export default connect(mapStateToProps, null)(PostsList);
