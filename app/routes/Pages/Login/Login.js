import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Form, FormGroup, Input, Button, Label, EmptyLayout, ThemeConsumer, Loading } from "./../../../components";
import { useDispatch, useSelector } from "react-redux";
import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { LoginActions } from "../../../redux/_actions/Login/LoginA";

const Login = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.LoginReducer.isLoading);
    const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);

    React.useEffect(() => {
        if (isLoggedIn) {
            props.history.push("/dashboards/projects");
        }
    }, [isLoggedIn]);

    const login = () => {
        dispatch(LoginActions.login(username, password));
    };

    return (
        <EmptyLayout>
            <EmptyLayout.Section center width={1000}>
                <HeaderAuth title="Đăng nhập" text="Truy cập quản lý website" />
                <Form className="mb-3" style={{ width: 500 }}>
                    <FormGroup>
                        <Label for="userName">Tên đăng nhập</Label>
                        <Input name="username" id="userName" className="bg-white" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Mật khẩu</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password..."
                            className="bg-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <ThemeConsumer>
                        {({ color }) => (
                            <Button color={color} block onClick={login}>
                                Đăng nhập
                            </Button>
                        )}
                    </ThemeConsumer>
                </Form>
                <div className="d-flex mb-5">
                    <Link to="/pages/forgotpassword" className="text-decoration-none">
                        Quên mật khẩu
                    </Link>
                    <Link to="/pages/register" className="ml-auto text-decoration-none">
                        Đăng ký
                    </Link>
                </div>
                <Loading isLoading={isLoading} />
            </EmptyLayout.Section>
        </EmptyLayout>
    );
};

export default Login;
