import actionTypes from "../../_constants/actionTypes";

const defaultState = {
    breadcrumbs: [],
};

export const NavbarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.NAVBAR_SWITCH_PAGE:
            return {
                ...state,
                breadcrumbs: action.data,
            }
        default:
            return state;
    }
};
