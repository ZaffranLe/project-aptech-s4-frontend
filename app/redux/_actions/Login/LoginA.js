import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const LoginActions = {
    login,
    logout,
};

function login(Username, Password) {
    function _callApi(Username, Password) {
        return axios({
            url: `${utilConstants.HOST}/api/auth`,
            method: "post",
            data: {
                Username,
                Password,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(Username, Password);
            if (resp.data.IsSuccess) {
                const data = resp.data.ListDataResult[0];
                localStorage.setItem("token", data["Token"]);
                const user = {
                    UserInfo: data["UserInfo"],
                    ListPermission: data["ListPermission"],
                }
                dispatch(_succeed(user));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Đăng nhập thất bại! Vui lòng thử lại sau"));
            dispatch(_failed())
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.LOGIN,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.LOGIN_SUCCEED,
            data
        };
    }

    function _failed() {
        return {
            type: actionTypes.LOGIN_FAILED,
        };
    }
}


function logout() {

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            localStorage.setItem("token", null);
            dispatch(_succeed());
        } catch (e) {
            console.error(e);
            toast.error(content("Đăng xuất thất bại! Vui lòng thử lại sau"));
            dispatch(_failed())
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.LOGOUT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.LOGOUT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.LOGOUT_FAILED,
        };
    }
}