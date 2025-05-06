import React, { useState } from 'react';
import { Layout } from 'antd';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';
import { AppContent } from '../components/layout/AppContent';
import UserManagementContent from '../components/user/UserManagementContent';
import SubjectManagement from '../components/subject/SubjectManagementContent';
import SubjectRegistrationListContent from '../components/subject-registration/SubjectRegistrationListContent';
import MentorMenteeRegistrationListContent from '../components/mentor-mentee-registration/MentorMenteeRegistrationListContent';
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
        label: 'Quản lý người dùng',
        icon: <UserOutlined />,
        content: <UserManagementContent />,
    },
    {
        key: '2',
        label: 'Quản lý môn học',
        icon: <BookOutlined />,
        content: <SubjectManagement />,
    },
    {
        key: '3',
        label: 'Danh sách đăng ký môn học',
        icon: <FormOutlined />,
        content: <SubjectRegistrationListContent />,
    },
    {
        key: '4',
        label: 'Danh sách đăng ký mentor',
        icon: <TeamOutlined />,
        content: <MentorMenteeRegistrationListContent />,
    },
];



export function AdminHomePage() {
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
