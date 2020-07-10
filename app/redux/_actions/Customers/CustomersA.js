import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const CustomerActions = {
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};

function getAllCustomer() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/customer`,
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
            toast.error(content("Lấy khách hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.CUSTOMER_GET_ALL_CUSTOMER,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.CUSTOMER_GET_ALL_CUSTOMER_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.CUSTOMER_GET_ALL_CUSTOMER_FAILED,
        };
    }
}

function createCustomer(data) {
    function _callApiCreateCustomer(data) {
        return axios({
            url: `${utilConstants.HOST}/api/customer`,
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
            const resp = await _callApiCreateCustomer(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Tạo khách hàng mới thành công!"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo khách hàng mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.CUSTOMER_CREATE_CUSTOMER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.CUSTOMER_CREATE_CUSTOMER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.CUSTOMER_CREATE_CUSTOMER_FAILED,
        };
    }
}

function updateCustomer(id, data) {
    function _callApiModifyCustomer(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/customer/${id}`,
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
            const resp = await _callApiModifyCustomer(id, data);
            if (resp.data.IsSuccess) {
                toast.success("Chỉnh sửa khách hàng thành công!");
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa khách hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.CUSTOMER_UPDATE_CUSTOMER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.CUSTOMER_UPDATE_CUSTOMER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.CUSTOMER_UPDATE_CUSTOMER_FAILED,
        };
    }
}

function deleteCustomer(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/customer/${id}`,
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
                toast.success(content("Xoá khách hàng thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá khách hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.CUSTOMER_DELETE_CUSTOMER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.CUSTOMER_DELETE_CUSTOMER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.CUSTOMER_DELETE_CUSTOMER_FAILED,
        };
    }
}
