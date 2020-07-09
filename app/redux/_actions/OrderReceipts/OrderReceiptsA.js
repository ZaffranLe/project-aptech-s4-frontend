import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const OrderReceiptActions = {
    getAllOrderReceipt,
    createOrderReceipt,
    updateOrderReceipt,
    deleteOrderReceipt,
};

function getAllOrderReceipt() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/orderdetail`,
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
                toast.success(content("Lấy hóa đơn bán hàng thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy hóa đơn bán hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_GET_ALL_ORDER_RECEIPT_FAILED,
        };
    }
}

function createOrderReceipt(data) {
    function _callApiCreateOrderReceipt(data) {
        return axios({
            url: `${utilConstants.HOST}/api/orderdetail`,
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
            const resp = await _callApiCreateOrderReceipt(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Tạo hóa đơn bán hàng mới thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo hóa đơn bán hàng mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_CREATE_ORDER_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_CREATE_ORDER_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_CREATE_ORDER_RECEIPT_FAILED,
        };
    }
}

function updateOrderReceipt(id, data) {
    function _callApiModifyOrderReceipt(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/orderdetail/${id}`,
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
            const resp = await _callApiModifyOrderReceipt(id, data);
            if (resp.data.IsSuccess) {
                toast.success(content("Chỉnh sửa hóa đơn bán hàng thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa hóa đơn bán hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_UPDATE_ORDER_RECEIPT_FAILED,
        };
    }
}

function deleteOrderReceipt(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/orderdetail/${id}`,
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
                toast.success(content("Xoá hóa đơn bán hàng thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá hóa đơn bán hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_DELETE_ORDER_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_DELETE_ORDER_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_DELETE_ORDER_RECEIPT_FAILED,
        };
    }
}
