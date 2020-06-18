import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const ProductActions = {
    getAllProduct,
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
            toast.success(content("Lấy danh sách sản phẩm thành công"));
            dispatch(_succeed());
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

    function _succeed() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.PRODUCT_GET_ALL_PRODUCT_FAILED,
        };
    }
}
