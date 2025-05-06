import { Modal, Button, Tag, Popconfirm } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const UserDetailPopup = ({ user, visible, onEdit, onDelete, onClose }) => (
    <Modal
        title={<span><UserOutlined /> Thông tin người dùng</span>}
        open={visible}
        onCancel={onClose}
        footer={[
            <Button key="edit" icon={<EditOutlined />} onClick={onEdit}>Sửa</Button>,
            <Popconfirm title="Xác nhận xoá user này?" onConfirm={onDelete} okText="Xoá" cancelText="Huỷ">
                <Button key="delete" icon={<DeleteOutlined />} danger>Xoá</Button>
            </Popconfirm>,
        ]}
    >
        <p><b>Họ tên:</b> {user.name}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Password:</b> {user.password}</p>
        <p><b>Vai trò:</b> <Tag color={user.role === 'Mentor' ? 'blue' : 'green'}>{user.role}</Tag></p>
        <p><b>Ngày sinh:</b> {user.birthday}</p>
        <p><b>Giới tính:</b> {user.gender}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>SĐT:</b> {user.phone}</p>
    </Modal>
);

export default UserDetailPopup;