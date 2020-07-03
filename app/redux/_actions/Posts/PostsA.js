import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const PostActions = {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};

function getAllPost() {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/post`,
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
                toast.success(content("Lấy bài viết thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy bài viết thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.POST_GET_ALL_POST,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.POST_GET_ALL_POST_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.POST_GET_ALL_POST_FAILED,
        };
    }
}

function getPostById(id) {
    function _callApi() {
        return axios({
            url: `${utilConstants.HOST}/api/post/${id}`,
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
                toast.success(content("Lấy bài viết thành công"));
                dispatch(_succeed(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Lấy bài viết thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.POST_GET_ALL_POST,
        };
    }

    function _succeed(data) {
        return {
            type: actionTypes.POST_GET_ALL_POST_SUCCEED,
            data,
        };
    }

    function _failed() {
        return {
            type: actionTypes.POST_GET_ALL_POST_FAILED,
        };
    }
}

function createPost(data) {
    function _callApiCreatePost(data) {
        return axios({
            url: `${utilConstants.HOST}/api/post`,
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
            const resp = await _callApiCreatePost(data);
            if (resp.data.IsSuccess) {
                toast.success(content("Tạo bài viết mới thành công!"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Tạo bài viết mới thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.POST_CREATE_POST,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.POST_CREATE_POST_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.POST_CREATE_POST_FAILED,
        };
    }
}

function updatePost(id, data) {
    function _callApiModifyPost(id, data) {
        return axios({
            url: `${utilConstants.HOST}/api/post/${id}`,
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
            const resp = await _callApiModifyPost(id, data);
            if (resp.data.IsSuccess) {
                toast.success("Chỉnh sửa bài viết thành công!");
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Chỉnh sửa bài viết thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.POST_UPDATE_POST,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.POST_UPDATE_POST_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.POST_UPDATE_POST_FAILED,
        };
    }
}

function deletePost(id) {
    function _callApi(id) {
        return axios({
            url: `${utilConstants.HOST}/api/post/${id}`,
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
                toast.success(content("Xoá bài viết thành công"));
                dispatch(_succeed());
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(content("Xoá bài viết thất bại!"));
            dispatch(_failed());
        }
    };

    function _beginAction() {
        return {
            type: actionTypes.POST_DELETE_POST,
        };
    }

    function _succeed() {
        return {
            type: actionTypes.POST_DELETE_POST_SUCCEED,
        };
    }

    function _failed() {
        return {
            type: actionTypes.POST_DELETE_POST_FAILED,
        };
    }
}
