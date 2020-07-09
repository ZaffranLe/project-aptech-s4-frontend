import React from "react";
import { SidebarMenu } from "./../../components";

export const SidebarMiddleNav = () => {
    return (
        <SidebarMenu>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Tổng quan" to="/dashboards/projects" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text-o"></i>} title="Đơn hàng">
                <SidebarMenu.Item title="Danh sách đơn nhập hàng" to="/apps/import-orders" exact />
                <SidebarMenu.Item title="Danh sách đơn bán hàng" to="/apps/orders" exact />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text-o"></i>} title="Nhà cung cấp" to="/apps/providers" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-clipboard"></i>} title="Bài viết">
                <SidebarMenu.Item title="Đăng bài viết mới" to="/apps/posts/create" exact />
                <SidebarMenu.Item title="Danh sách các bài viết" to="/apps/posts" exact />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-users"></i>} title="Khách hàng" to="/apps/customers" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Sản phẩm" to="/products" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Quản lý sản phẩm">
                <SidebarMenu.Item title="Thêm sản phẩm mới" to="/apps/products/create" exact />
                <SidebarMenu.Item title="Danh sách sản phẩm" to="/apps/products" exact />
                <SidebarMenu.Item title="Loại sản phẩm" to="/apps/product/types" exact />
                <SidebarMenu.Item title="Nhà sản xuất" to="/apps/manufacturers" exact />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-area-chart"></i>} title="Báo cáo">
                <SidebarMenu.Item title="Báo cáo 1" />
                <SidebarMenu.Item title="Báo cáo 2" />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-cog"></i>} title="Cấu hình">
                <SidebarMenu.Item title="Quyền hạn" to="/apps/permissions" />
                <SidebarMenu.Item title="Chức vụ" to="/apps/roles" />
                <SidebarMenu.Item title="Nhân viên" to="/apps/users/grid" />
            </SidebarMenu.Item>
        </SidebarMenu>
    );
};
