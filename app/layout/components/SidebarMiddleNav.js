import React from "react";
import { SidebarMenu } from "./../../components";
import Private from "../../components/Private";
import { PERMISSIONS } from "../../utils/_permissions";

export const SidebarMiddleNav = () => {
    return (
        <SidebarMenu>
            <Private pageWrapper={false}>
                <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-home"></i>}
                    title="Tổng quan"
                    to="/dashboards/projects"
                    exact
                />
            </Private>
            <Private PERMISSION={PERMISSIONS.VIEW_MENU_ORDER} pageWrapper={false}>
                <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text-o"></i>} title="Đơn hàng">
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_IMPORT_RECEIPT} pageWrapper={false}>
                        <SidebarMenu.Item title="Danh sách đơn nhập hàng" to="/apps/import-orders" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_ORDER} pageWrapper={false}>
                        <SidebarMenu.Item title="Danh sách đơn bán hàng" to="/apps/orders" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_PROVIDER} pageWrapper={false}>
                        <SidebarMenu.Item title="Nhà cung cấp" to="/apps/providers" exact />
                    </Private>
                </SidebarMenu.Item>
            </Private>
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_POST} pageWrapper={false}>
                <SidebarMenu.Item icon={<i className="fa fa-fw fa-clipboard"></i>} title="Bài viết">
                    <Private PERMISSION={PERMISSIONS.CREATE_POST} pageWrapper={false}>
                        <SidebarMenu.Item title="Đăng bài viết mới" to="/apps/posts/create" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_POST} pageWrapper={false}>
                        <SidebarMenu.Item title="Danh sách các bài viết" to="/apps/posts" exact />
                    </Private>
                </SidebarMenu.Item>
            </Private>
            <Private PERMISSION={PERMISSIONS.VIEW_LIST_CUSTOMER} pageWrapper={false}>
                <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-users"></i>}
                    title="Khách hàng"
                    to="/apps/customers"
                    exact
                />
            </Private>
            <Private PERMISSION={PERMISSIONS.VIEW_MENU_PRODUCT} pageWrapper={false}>
                <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Quản lý sản phẩm">
                    <Private PERMISSION={PERMISSIONS.CREATE_PRODUCT} pageWrapper={false}>
                        <SidebarMenu.Item title="Thêm sản phẩm mới" to="/apps/products/create" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_PRODUCT} pageWrapper={false}>
                        <SidebarMenu.Item title="Danh sách sản phẩm" to="/apps/products" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_PRODUCT_TYPE} pageWrapper={false}>
                        <SidebarMenu.Item title="Loại sản phẩm" to="/apps/product/types" exact />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_MANUFACTURER} pageWrapper={false}>
                        <SidebarMenu.Item title="Nhà sản xuất" to="/apps/manufacturers" exact />
                    </Private>
                </SidebarMenu.Item>
            </Private>
            <Private PERMISSION={PERMISSIONS.VIEW_MENU_CONFIG} pageWrapper={false}>
                <SidebarMenu.Item icon={<i className="fa fa-fw fa-cog"></i>} title="Cấu hình">
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_PERMISSION} pageWrapper={false}>
                        <SidebarMenu.Item title="Quyền hạn" to="/apps/permissions" />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_ROLE} pageWrapper={false}>
                        <SidebarMenu.Item title="Chức vụ" to="/apps/roles" />
                    </Private>
                    <Private PERMISSION={PERMISSIONS.VIEW_LIST_USER} pageWrapper={false}>
                        <SidebarMenu.Item title="Nhân viên" to="/apps/users" />
                    </Private>
                </SidebarMenu.Item>
            </Private>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Sản phẩm" to="/products" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-shopping-cart"></i>} title="Giỏ hàng" to="/cart" exact />
        </SidebarMenu>
    );
};
