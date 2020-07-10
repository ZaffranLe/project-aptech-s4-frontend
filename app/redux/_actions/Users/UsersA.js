import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const UserActions = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
};

function getAllUser() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/userinfo`,
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi();
            if (resp.data.IsSuccess) {
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy danh sách nhân viên thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_GET_ALL_USER,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.USER_GET_ALL_USER_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_GET_ALL_USER_FAILED,
        };
    }
}

function createUser(data) {
    function _callApiCreateUser(data) {
        return axios({
            url: `${utilConstants.HOST}/api/registry`,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data,
        });
    }

    function _callApiCreateImage(imageData) {
        return axios({
            url: `${utilConstants.HOST}/api/image`,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
            data: imageData,
        });
    }

    function _callApiCreateUserRole(data) {
        return axios({
            url: `${utilConstants.HOST}/api/userrole`,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const { userData, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    userData["ImageId"].push(img["Id"]);
                });
                userData["ImageId"] = userData["ImageId"].join(",");
                const resp = await _callApiCreateUser(userData);
                if (resp.data.IsSuccess) {
                    const userId = resp.data.ListDataResult[0]["UserInfo"]["IdUserLogin"];
                    const assignRoleResp = await _callApiCreateUserRole({
                        UserId: userId,
                        IdRole: userData["IdRole"],
                        Action: 1,
                    });
                    if (assignRoleResp.data.IsSuccess) {
                        toast.success(content("Tạo nhân viên mới thành công"));
                        dispatch(_succeed());
                    } else {
                        throw assignRoleResp.data.ErrorMsg;
                    }
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo nhân viên mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_CREATE_USER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_CREATE_USER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_CREATE_USER_FAILED,
        };
    }
}

function updateUser(id, data) {
    function _callApiModifyType(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/userinfo/${id}`,
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data,
        });
    }

    function _callApiCreateImage(imageData) {
        return axios({
            url: `${utilConstants.HOST}/api/image`,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
            data: imageData,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const { userData, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    userData["ImageId"].push(img["Id"]);
                });
                userData["ImageId"] = userData["ImageId"].join(",");
                const resp = await _callApiModifyType(id, userData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Chỉnh sửa nhân viên thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa nhân viên thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_UPDATE_USER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_UPDATE_USER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_UPDATE_USER_FAILED,
        };
    }
}

function deleteUser(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/usertype/${id}`,
            method: "delete",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(id);
            if (resp.data.IsSuccess) {
                toast.success(content("Xoá nhân viên thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá nhân viên thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.USER_DELETE_USER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.USER_DELETE_USER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.USER_DELETE_USER_FAILED,
        };
    }
}
