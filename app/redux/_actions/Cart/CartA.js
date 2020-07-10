import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const CartActions = {
    addProductToCart,
    removeProductFromCart,
    changeQuantity,
    refreshCart,
    order,
};

function addProductToCart(product) {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CART_ADD_PRODUCT,
            data: product,
        });
        toast.success(content("Đã thêm sản phẩm vào giỏ hàng."));
    };
}

function removeProductFromCart(id) {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CART_REMOVE_PRODUCT,
            data: id,
        });
        toast.success(content("Đã xoá sản phẩm khỏi giỏ hàng."));
    };
}

function changeQuantity(id, buyingQuantity) {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CART_CHANGE_QUANTITY,
            id,
            buyingQuantity,
        });
    };
}

function refreshCart() {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CART_REFRESH_CART,
        });
    };
}

function order(data) {
    function _callApi(data) {
        return axios({
            url: `${utilConstants.HOST}/api/neworder`,
            method: "post",
            data,
        });
    }

    return async (dispatch) => {
        try {
            dispatch(_beginAction());
            const resp = await _callApi(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Cảm ơn bạn đã mua hàng. Vui lòng vào email để xác nhận đơn đặt hàng."));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Đặt hàng thất bại! Vui lòng thử lại sau."));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.CART_ORDER,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.CART_ORDER_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.CART_ORDER_FAILED,
        };
    }
}
