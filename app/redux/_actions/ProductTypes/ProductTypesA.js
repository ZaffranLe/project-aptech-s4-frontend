import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ProductTypeActions = {
    getAllProductType,
    createProductType,
    updateProductType,
    deleteProductType,
};

function getAllProductType() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/producttype`,
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
                toast.success(content("Lấy thể loại sản phẩm thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                toast.error(content("Lấy thể loại sản phẩm thất bại!"));
                dispatch(_failed());
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy thể loại sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_TYPE_FAILED,
        };
    }
}

function createProductType(data) {
    function _callApiCreateType(data) {
        return axios({
            url: `${utilConstants.HOST}/api/producttype`,
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
            console.log(data);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    ImageId.push(img["Id"]);
                });
                const typeData = {
                    Name,
                    ImageId: ImageId.join(","),
                };
                const resp = await _callApiCreateType(typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Tạo thể loại sản phẩm mới thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo thể loại sản phẩm mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_TYPE_FAILED,
        };
    }
}

function updateProductType(id, data) {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/producttype`,
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
            const resp = await _callApi();
            if (resp.data.IsSuccess) {
                toast.success(content("Chỉnh sửa thể loại sản phẩm thành công"));
                dispatch(_succeed());
            } else {
                toast.error(content("Chỉnh sửa thể loại sản phẩm thất bại!"));
                dispatch(_failed());
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa thể loại sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_TYPE_FAILED,
        };
    }
}

function deleteProductType(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/producttype/${id}`,
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
                toast.success(content("Xoá thể loại sản phẩm thành công"));
                dispatch(_succeed());
            } else {
                toast.error(content("Xoá thể loại sản phẩm thất bại!"));
                dispatch(_failed());
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá thể loại sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_TYPE,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_TYPE_FAILED,
        };
    }
}
