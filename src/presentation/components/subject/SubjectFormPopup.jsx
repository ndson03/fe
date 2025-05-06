import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const SubjectFormPopup = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title={initialValues ? 'Cập nhật môn học' : 'Tạo môn học mới'}
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            okText="Lưu"
            cancelText="Huỷ"
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={initialValues || { mentors: [] }}
            >
                <Form.Item name="subjectId" label="Mã môn" rules={[{ required: true }]}>
                    <Input disabled={!!initialValues} />
                </Form.Item>
                <Form.Item name="name" label="Tên môn học" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="content" label="Nội dung">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="references" label="Tài liệu tham khảo">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="mentors" label="Mentors">
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập tên mentor" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubjectFormPopup;
