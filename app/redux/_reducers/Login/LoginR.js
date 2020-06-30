import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    isLoggedIn: false,
    User: {
        UserInfo: {},
        ListPermission: [],
    },
    isLoading: false,
};

export const LoginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.LOGIN_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                User: {
                    ...action.data,
                },
            };
        case actionTypes.LOGOUT_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                User: {
                    UserInfo: {},
                    ListPermission: [],
                },
            };
        case actionTypes.LOGIN_FAILED:
        case actionTypes.LOGOUT_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
