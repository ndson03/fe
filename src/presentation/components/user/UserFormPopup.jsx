import { Modal, Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const { Option } = Select;

const UserFormPopup = ({ visible, onSubmit, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title={initialValues ? 'Sửa thông tin user' : 'Tạo user mới'}
            open={visible}
            onOk={() => form.validateFields().then(onSubmit)}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ ...initialValues, birthday: initialValues?.birthday ? dayjs(initialValues.birthday) : undefined }}
            >
                <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}><Input.Password /></Form.Item>
                <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
                    <Select><Option value="Mentor">Mentor</Option><Option value="Mentee">Mentee</Option></Select>
                </Form.Item>
                <Form.Item name="birthday" label="Ngày sinh"><DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} /></Form.Item>
                <Form.Item name="gender" label="Giới tính"><Select><Option value="Nam">Nam</Option><Option value="Nữ">Nữ</Option></Select></Form.Item>
                <Form.Item name="email" label="Email"><Input /></Form.Item>
                <Form.Item name="phone" label="Số điện thoại"><Input /></Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormPopup;