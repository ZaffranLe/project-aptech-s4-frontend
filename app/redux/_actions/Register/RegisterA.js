import actionTypes from "../../_constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import utilConstants from "../../../utils/_constants";
import { content } from "../../../components/ToastContainer/ToastContainer";

export const RegisterActions = {
};

function createAccount(info) {
    function _callApi(info) {
        return axios({
            url: `${utilConstants.HOST}/api/userlogin`,
            method: 'post',
            data: info
        })
    }

    return async dispatch => {
        
    }
}