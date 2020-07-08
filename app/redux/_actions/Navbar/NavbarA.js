import actionTypes from "../../_constants/actionTypes";

export const NavbarActions = {
    switchPage,
};

function switchPage(breadcrumbs) {

    return async (dispatch) => {
        dispatch({
            type: actionTypes.NAVBAR_SWITCH_PAGE,
            data: breadcrumbs,
        })
    };

}