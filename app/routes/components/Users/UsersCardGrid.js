import React from "react";
import {
    Card,
    CardBody,
    Button,
    UncontrolledTooltip,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    CardFooter,
    CustomInput,
    ButtonGroup,
    DropdownItem,
    Avatar,
    AvatarAddOn,
} from "./../../../components";
import avatar from "./avatar-placeholder.png";

class UsersCardGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, handleOpenModifyModal } = this.props;
        return (
            <Card>
                <CardBody>
                    <div className="d-flex">
                        <ButtonGroup size="sm" className="ml-auto">
                            <UncontrolledButtonDropdown className="ml-auto">
                                <DropdownToggle color="link" size="sm" className="pt-0">
                                    <i className="fa fa-fw fa-bars pr-0" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => handleOpenModifyModal(user)}>
                                        <i className="fa fa-fw fa-pencil mr-2"></i>
                                        Chỉnh sửa
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <i className="fa fa-fw fa-trash mr-2"></i>
                                        Xoá
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </ButtonGroup>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <Avatar.Image
                            size="lg"
                            src={user["ListImages"].length > 0 ? user["ListImages"][0]["ImageUrl"] : avatar}
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <a className="h6 text-decoration-none" href="#">
                            {user["UserInfo"]["Name"]}
                        </a>
                        <div className="text-center mt-2">SĐT: {user["UserInfo"]["Phone"]}</div>
                        <div className="text-center">
                            <i className="fa fa-map-marker mr-1"></i>
                            {user["UserInfo"]["Address"]}
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default UsersCardGrid;
