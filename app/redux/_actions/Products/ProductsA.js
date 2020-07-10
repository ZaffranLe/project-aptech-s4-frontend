import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ProductActions = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

function getAllProduct() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/product`,
            method: "get",
            headers: {
                "Authorization": `${utilConstants.TOKEN}`
            }
            
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
            toast.error(content("Lấy danh sách sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_SUCCEED,
            data
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_FAILED,
        };
    }
}

function getProduct(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/product/${id}`,
            method: "get",
            headers: {
                "Authorization": `${utilConstants.TOKEN}`
            }
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(id);
            if (resp.data.IsSuccess) {
                dispatch(_succeed(resp.data.ListDataResult[0]));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT_SUCCEED,
            data
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_PRODUCT_FAILED,
        };
    }
}

function createProduct(data) {
    function _callApiCreateProduct(data) {
        return axios({
            url: `${utilConstants.HOST}/api/product`,
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

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const { productData, imageData } = data;
            const createImgResp = await _callApiCreateImage(imageData);
            if (createImgResp.data.IsSuccess) {
                createImgResp.data.ListDataResult.map((img) => {
                    productData["Product"]["ImageId"].push(img["Id"]);
                });
                productData["Product"]["ImageId"] = productData["Product"]["ImageId"].join(","); 
                const resp = await _callApiCreateProduct(productData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Tạo sản phẩm mới thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo sản phẩm mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_CREATE_PRODUCT_FAILED,
        };
    }
}

function updateProduct(id, data) {
    function _callApiModifyType(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/product/${id}`,
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
                const resp = await _callApiModifyType(id, typeData);
                if (resp.data.IsSuccess) {
                    toast.success(content("Chỉnh sửa sản phẩm thành công"));
                    dispatch(_succeed());
                } else {
                    throw resp.data.ErrorMsg;
                }
            } else {
                throw createImgResp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_UPDATE_PRODUCT_FAILED,
        };
    }
}

function deleteProduct(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/product/${id}`,
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
                toast.success(content("Xoá sản phẩm thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá sản phẩm thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_DELETE_PRODUCT_FAILED,
        };
    }
}
