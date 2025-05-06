import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserFormPopup from './UserFormPopup';
import UserDetailPopup from './UserDetailPopup';
import UserPagination from './UserPagination';
import { Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const defaultUsers = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        password: '123456',
        role: 'Mentor',
        birthday: '2000-01-01',
        gender: 'Nam',
        email: 'a@example.com',
        phone: '0123456789'
    },
    {
        id: 2,
        name: 'Nguyễn Văn A',
        username: 'nguyenvanb',
        password: '123456',
        role: 'Mentee',
        birthday: '2000-01-01',
        gender: 'Nam',
        email: 'a@example.com',
        phone: '0123456789'
    },
];

const UserManagementContent = () => {
    const [users, setUsers] = useState(defaultUsers);
    const [formVisible, setFormVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [detailUser, setDetailUser] = useState(null);

    const handleCreate = () => {
        setEditingUser(null);
        setFormVisible(true);
    };

    const handleEdit = (e, record) => {
        e.stopPropagation();
        setEditingUser(record);
        setFormVisible(true);
    };

    const handleDelete = (e, record) => {
        e.stopPropagation();
        setUsers(users.filter(u => u.id !== record.id));
    };

    const handleSubmit = (values) => {
        const newUser = {
            ...values,
            id: editingUser ? editingUser.id : Date.now(),
            birthday: values.birthday?.format('YYYY-MM-DD')
        };
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? newUser : u));
        } else {
            setUsers([...users, newUser]);
        }
        setFormVisible(false);
    };

    const columns = [
        { title: 'Tên', dataIndex: 'name' },
        { title: 'Username', dataIndex: 'username' },
        { title: 'Password', dataIndex: 'password' },
        { title: 'Role', dataIndex: 'role', render: role => <Tag color={role === 'Mentor' ? 'blue' : 'green'}>{role}</Tag> },
        { title: 'Ngày sinh', dataIndex: 'birthday' },
        { title: 'Giới tính', dataIndex: 'gender' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'SĐT', dataIndex: 'phone' },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space>
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={e => handleEdit(e, record)}
                        >
                            Sửa
                    </Button>
                    <Popconfirm 
                        title="Xoá user này?" 
                        onConfirm={e => handleDelete(e, record)} 
                        okText="Xoá" 
                        cancelText="Huỷ"
                        >
                        <Button icon={<DeleteOutlined />} danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
                Tạo user mới
            </Button>

            <UserPagination users={users} columns={columns} onRowClick={setDetailUser} />

            <UserFormPopup
                visible={formVisible}
                initialValues={editingUser}
                onSubmit={handleSubmit}
                onCancel={() => setFormVisible(false)}
            />

            {detailUser && (
                <UserDetailPopup
                    user={detailUser}
                    visible={!!detailUser}
                    onEdit={e => handleEdit(e, detailUser)}
                    onDelete={e => { handleDelete(e, detailUser); setDetailUser(null); }}
                    onClose={() => setDetailUser(null)}
                />
            )}
        </div>
    );
};

export default UserManagementContent;