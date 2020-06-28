import React from "react";
import { Link } from "react-router-dom";

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer,
} from "./../../../components";

import { connect } from "react-redux";

const Register = () => (
    <EmptyLayout>
        <EmptyLayout.Section center width={480}>
            <h1>Tạo tài khoản mới</h1>
            <Form className="mb-3">
                <FormGroup>
                    <Label for="username">Tên đăng nhập</Label>
                    <Input
                        type="text"
                        name="text"
                        id="username"
                        className="bg-white"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Mật khẩu</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-white"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="repeatPassword">Nhập lại mật khẩu</Label>
                    <Input
                        type="password"
                        name="password"
                        id="repeatPassword"
                        className="bg-white"
                    />
                </FormGroup>
                <ThemeConsumer>
                    {({ color }) => (
                        <Button color={color} block tag={Link} to="/">
                            Tạo tài khoản
                        </Button>
                    )}
                </ThemeConsumer>
            </Form>
            <div className="d-flex mb-5">
                <Link to="/pages/forgot-password" className="text-decoration-none">
                    Quên mật khẩu
                </Link>
                <Link to="/pages/login" className="ml-auto text-decoration-none">
                    Đăng nhập
                </Link>
            </div>
        </EmptyLayout.Section>
    </EmptyLayout>
);

const mapStateToProps = ({ RegisterReducer }) => RegisterReducer;

export default connect(mapStateToProps, null)(Register);
