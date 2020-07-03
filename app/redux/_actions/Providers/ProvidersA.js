import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ProviderActions = {
    getAllProvider,
    createProvider,
    updateProvider,
    deleteProvider,
};

function getAllProvider() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/provider`,
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
                toast.success(content("Lấy nhà cung cấp thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy nhà cung cấp thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_GET_ALL_PROVIDER,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PROVIDER_GET_ALL_PROVIDER_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_GET_ALL_PROVIDER_FAILED,
        };
    }
}

function createProvider(data) {
    function _callApiCreateType(data) {
        return axios({
            url: `${utilConstants.HOST}/api/provider`,
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
            const { providerData, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    providerData["ImageId"].push(img["Id"]);
                });
                providerData["ImageId"] = providerData["ImageId"].join(",");
                const resp = await _callApiCreateType(providerData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Tạo nhà cung cấp mới thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo nhà cung cấp mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_CREATE_PROVIDER_FAILED,
        };
    }
}

function updateProvider(id, data) {
    function _callApiModifyType(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/provider/${id}`,
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
            const { providerData, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    providerData["ImageId"].push(img["Id"]);
                });
                providerData["ImageId"] = providerData["ImageId"].join(",");
                const resp = await _callApiModifyType(id, providerData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Chỉnh sửa nhà cung cấp thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa nhà cung cấp thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_UPDATE_PROVIDER_FAILED,
        };
    }
}

function deleteProvider(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/provider/${id}`,
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
                toast.success(content("Xoá nhà cung cấp thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá nhà cung cấp thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PROVIDER_DELETE_PROVIDER_FAILED,
        };
    }
}
