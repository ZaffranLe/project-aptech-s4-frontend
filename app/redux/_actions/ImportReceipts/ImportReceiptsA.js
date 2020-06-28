import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ManufacturerActions = {
    getAllManufacturer,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
};

function getAllManufacturer() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/manufacturer`,
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
                toast.success(content("Lấy nhà sản xuất thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy nhà sản xuất thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.MANUFACTURER_GET_ALL_MANUFACTURER_FAILED,
        };
    }
}

function createManufacturer(data) {
    function _callApiCreateManufacturer(data) {
        return axios({
            url: `${utilConstants.HOST}/api/manufacturer`,
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
                const resp = await _callApiCreateManufacturer(typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Tạo nhà sản xuất mới thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo nhà sản xuất mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.MANUFACTURER_CREATE_MANUFACTURER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.MANUFACTURER_CREATE_MANUFACTURER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.MANUFACTURER_CREATE_MANUFACTURER_FAILED,
        };
    }
}

function updateManufacturer(id, data) {
    function _callApiModifyManufacturer(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/manufacturer/${id}`,
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
                const resp = await _callApiModifyManufacturer(id, typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Chỉnh sửa nhà sản xuất thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa nhà sản xuất thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.MANUFACTURER_UPDATE_MANUFACTURER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.MANUFACTURER_UPDATE_MANUFACTURER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.MANUFACTURER_UPDATE_MANUFACTURER_FAILED,
        };
    }
}

function deleteManufacturer(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/manufacturer/${id}`,
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
                toast.success(content("Xoá nhà sản xuất thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá nhà sản xuất thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.MANUFACTURER_DELETE_MANUFACTURER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.MANUFACTURER_DELETE_MANUFACTURER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.MANUFACTURER_DELETE_MANUFACTURER_FAILED,
        };
    }
}
