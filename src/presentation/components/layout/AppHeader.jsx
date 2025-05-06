import React from 'react';
import { Layout, Avatar, Badge, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menu = (
    <Menu>
        <Menu.ItemGroup title="Nguyễn Văn A">
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item key="profile">Hồ sơ cá nhân</Menu.Item>
        <Menu.Item key="settings">Cài đặt</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
);

export function AppHeader() {
    return (
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', zIndex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, cursor: 'pointer' }}>
                <span style={{ color: '#1890ff' }}>🎓 EduPortal</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Badge count={3}>
                    <BellOutlined style={{ fontSize: '18px' }} />
                </Badge>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                </Dropdown>
            </div>
        </Header>
    );
}