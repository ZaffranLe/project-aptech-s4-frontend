import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ImportReceiptActions = {
    getAllImportReceipt,
    createImportReceipt,
    updateImportReceipt,
    deleteImportReceipt,
};

function getAllImportReceipt() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/importreceipt`,
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
                toast.success(content("Lấy hóa đơn nhập hàng thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy hóa đơn nhập hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_GET_ALL_IMPORT_RECEIPT_FAILED,
        };
    }
}

function createImportReceipt(data) {
    function _callApiCreateImportReceipt(data) {
        return axios({
            url: `${utilConstants.HOST}/api/importreceipt`,
            method: "post",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
            data,
        });
    }

    function _callApiCreateImage(imageData) {
        return axios({
            url: `${utilConstants.HOST}/api/image`,
            method: "post",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
                "Content-Type": "multipart/form-data",
            },
            data: imageData,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const { Name, ImageId, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    ImageId.push(img["Id"]);
                });
                const typeData = {
                    Name,
                    ImageId: ImageId.join(","),
                };
                const resp = await _callApiCreateImportReceipt(typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Tạo hóa đơn nhập hàng mới thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo hóa đơn nhập hàng mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_CREATE_IMPORT_RECEIPT_FAILED,
        };
    }
}

function updateImportReceipt(id, data) {
    function _callApiModifyImportReceipt(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/importreceipt/${id}`,
            method: "put",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
            },
            data,
        });
    }

    function _callApiCreateImage(imageData) {
        return axios({
            url: `${utilConstants.HOST}/api/image`,
            method: "post",
            headers: {
                Authorization: `${utilConstants.TOKEN}`,
                "Content-Type": "multipart/form-data",
            },
            data: imageData,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const { Name, ImageId, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    ImageId.push(img["Id"]);
                });
                const typeData = {
                    Name,
                    ImageId: ImageId.join(","),
                };
                const resp = await _callApiModifyImportReceipt(id, typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Chỉnh sửa hóa đơn nhập hàng thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa hóa đơn nhập hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_UPDATE_IMPORT_RECEIPT_FAILED,
        };
    }
}

function deleteImportReceipt(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/importreceipt/${id}`,
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
                toast.success(content("Xoá hóa đơn nhập hàng thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá hóa đơn nhập hàng thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.RECEIPT_DELETE_IMPORT_RECEIPT_FAILED,
        };
    }
}
