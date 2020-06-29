import React from "react";
import { SidebarMenu } from "./../../components";

export const SidebarMiddleNav = () => {
    return (
        <SidebarMenu>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Tổng quan" to="/dashboards/projects" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text-o"></i>} title="Đơn hàng">
                <SidebarMenu.Item title="Danh sách đơn nhập hàng" to="/import-orders/import-orders-list" exact />
                <SidebarMenu.Item title="Danh sách đơn bán hàng" to="/order-receipt/order-list" exact />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text-o"></i>} title="Nhà cung cấp" to="/apps/providers" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-clipboard"></i>} title="Bài viết">
                <SidebarMenu.Item title="Đăng bài viết mới" to="/apps/posts/create" exact />
                <SidebarMenu.Item title="Danh sách các bài viết" to="/apps/posts" exact />
            </SidebarMenu.Item>
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-users"></i>} title="Khách hàng" to="/apps/customers" exact />
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Sản phẩm">
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
                <SidebarMenu.Item title="Tài khoản thành viên" to="/apps/users" />
            </SidebarMenu.Item>
            {/* -------- Pages ---------*/}
            <SidebarMenu.Item icon={<i className="fa fa-fw fa-copy"></i>} title="Pages">
                <SidebarMenu.Item title="Register" to="/pages/register" />
                <SidebarMenu.Item title="Login" to="/pages/login" />
                <SidebarMenu.Item title="Forgot Password" to="/pages/forgot-password" />
                <SidebarMenu.Item title="Lock Screen" to="/pages/lock-screen" />
                <SidebarMenu.Item title="Error 404" to="/pages/error-404" />
                <SidebarMenu.Item title="Confirmation" to="/pages/confirmation" />
                <SidebarMenu.Item title="Success" to="/pages/success" />
                <SidebarMenu.Item title="Danger" to="/pages/danger" />
                <SidebarMenu.Item title="Coming Soon" to="/pages/coming-soon" />
                <SidebarMenu.Item title="Timeline" to="/pages/timeline" />
            </SidebarMenu.Item>
        </SidebarMenu>
    );
};
