import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const RoleActions = {
    getAllRole,
    createRole,
    updateRole,
    deleteRole,
};

function getAllRole() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/role`,
            method: "get",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi();
            if (resp.data.IsSuccess) {
                toast.success(content("Lấy chức vụ thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy chức vụ thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.ROLE_GET_ALL_ROLE,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.ROLE_GET_ALL_ROLE_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.ROLE_GET_ALL_ROLE_FAILED,
        };
    }
}

function createRole(data) {
    function _callApiCreateRole(data) {
        return axios({
            url: `${utilConstants.HOST}/api/role`,
            method: "post",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
            data,
        });
    }

    function _callApiCreateRolePermissions(data) {
        return axios({
            url: `${utilConstants.HOST}/api/placeholder`,
            method: "post",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApiCreateRole(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Tạo chức vụ mới thành công!"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo chức vụ mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.ROLE_CREATE_ROLE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.ROLE_CREATE_ROLE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.ROLE_CREATE_ROLE_FAILED,
        };
    }
}

function updateRole(id, data) {
    function _callApiModifyRole(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/role/${id}`,
            method: "put",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApiModifyRole(id, data);
            if (resp.data.IsSuccess) {
                toast.success("Chỉnh sửa chức vụ thành công!");
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa chức vụ thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.ROLE_UPDATE_ROLE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.ROLE_UPDATE_ROLE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.ROLE_UPDATE_ROLE_FAILED,
        };
    }
}

function deleteRole(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/role/${id}`,
            method: "delete",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(id);
            if (resp.data.IsSuccess) {
                toast.success(content("Xoá chức vụ thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá chức vụ thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.ROLE_DELETE_ROLE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.ROLE_DELETE_ROLE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.ROLE_DELETE_ROLE_FAILED,
        };
    }
}
