import React, { useState } from 'react';
import { Layout } from 'antd';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';
import { AppContent } from '../components/layout/AppContent';
import {
    UserOutlined,
    BookOutlined,
    FormOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const contentOptions = [
    {
        key: '1',
        label: 'Đăng ký môn học',
        icon: <BookOutlined />,
        content: <div>Đăng ký môn học</div>
    },
    {
        key: '2',
        label: 'Đăng ký mentor',
        icon: <UserOutlined />,
        content: <div>Đăng ký mentor</div>
    },
    {
        key: '3',
        label: 'Danh sách môn học đã đăng ký',
        icon: <FormOutlined />,
        content: <div>Danh sách môn học đã đăng ký</div>,
    },
    {
        key: '4',
        label: 'Danh sách mentor đã đăng ký',
        icon: <TeamOutlined />,
        content: <div>Danh sách mentor đã đăng ký</div>,
    },
];



export function MenteeHomePage() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} trigger={null} width={200} style={{ position: 'fixed', left: 0, top: 64, bottom: 0 }}>
                <AppSidebar 
                    collapsed={collapsed} 
                    toggleCollapsed={() => setCollapsed(!collapsed)} 
                    selectedKey={selectedKey} 
                    onSelect={setSelectedKey} 
                    contentOptions={contentOptions}
                    />
            </Sider>
            <AppHeader />
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Content style={{ margin: '80px 16px 16px 16px' }}>
                    <AppContent 
                        selectedKey={selectedKey} 
                        onSelect={setSelectedKey}
                        contentOptions={contentOptions}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}
