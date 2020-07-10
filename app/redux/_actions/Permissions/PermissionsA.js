import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const PermissionActions = {
    getAllPermission,
    createPermission,
    updatePermission,
    deletePermission,
};

function getAllPermission() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/permission`,
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
            toast.error(content("Lấy quyền hạn thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_GET_ALL_PERMISSION,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PERMISSION_GET_ALL_PERMISSION_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_GET_ALL_PERMISSION_FAILED,
        };
    }
}

function createPermission(data) {
    function _callApiCreatePermission(data) {
        return axios({
            url: `${utilConstants.HOST}/api/permission`,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApiCreatePermission(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Tạo quyền hạn mới thành công!"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo quyền hạn mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_CREATE_PERMISSION_FAILED,
        };
    }
}

function updatePermission(id, data) {
    function _callApiModifyPermission(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/permission/${id}`,
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApiModifyPermission(id, data);
            if (resp.data.IsSuccess) {
                toast.success("Chỉnh sửa quyền hạn thành công!");
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa quyền hạn thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_UPDATE_PERMISSION_FAILED,
        };
    }
}

function deletePermission(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/permission/${id}`,
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
                toast.success(content("Xoá quyền hạn thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá quyền hạn thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PERMISSION_DELETE_PERMISSION_FAILED,
        };
    }
}
