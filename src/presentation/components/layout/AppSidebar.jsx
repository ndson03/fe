import React from 'react';
import { Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';



export function AppSidebar({ collapsed, toggleCollapsed, selectedKey, onSelect, contentOptions }) {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={({ key }) => onSelect(key)}
                style={{ flex: 1, marginTop: 20 }}
            >
                {contentOptions.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[]}
                onClick= { toggleCollapsed }
            >
                <Menu.Item icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}>
                    {collapsed ? 'Mở rộng' : 'Thu gọn'}
                </Menu.Item>
            </Menu>
        </div>
    );
}