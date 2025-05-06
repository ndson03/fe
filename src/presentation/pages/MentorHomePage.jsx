import React, { useState } from 'react';
import { Layout } from 'antd';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';
import { AppContent } from '../components/layout/AppContent';
import {
    UserOutlined,
    BookOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const contentOptions = [
    {
        key: '1',
        label: 'Danh sách mentee',
        icon: <UserOutlined />,
        content: <div>Danh sách mentee</div>
    },
    {
        key: '2',
        label: 'Danh sách môn học',
        icon: <BookOutlined />,
        content: <div>Danh sách môn học</div>
    }
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
