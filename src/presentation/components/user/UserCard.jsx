// File: components/UserCard.jsx
import { Button, Popconfirm, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => (
    <Space>
        <span>{user.name}</span>
        <span>{user.username}</span>
        <span>{user.password}</span>
        <Tag color={user.role === 'Mentor' ? 'blue' : 'green'}>{user.role}</Tag>
        <span>{user.birthday}</span>
        <span>{user.gender}</span>
        <span>{user.email}</span>
        <span>{user.phone}</span>
        <Button icon={<EditOutlined />} onClick={() => onEdit(user)}>Sửa</Button>
        <Popconfirm title="Xoá user này?" onConfirm={() => onDelete(user)} okText="Xoá" cancelText="Huỷ">
            <Button icon={<DeleteOutlined />} danger>Xoá</Button>
        </Popconfirm>
    </Space>
);

export default UserCard;