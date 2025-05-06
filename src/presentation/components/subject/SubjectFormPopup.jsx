import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const SubjectFormPopup = ({ visible, onCancel, onSubmit, initialValues, mentorsList = [] }) => {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false);
    
    // Reset form với initialValues khi mở modal hoặc khi initialValues thay đổi
    useEffect(() => {
        if (visible) {
            console.log('Form reset with initialValues:', initialValues);
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            }
        }
    }, [visible, initialValues, form]);

    const handleOk = () => {
        setSubmitLoading(true);
        form.validateFields()
            .then((values) => {
                console.log('Form submitted values:', values);
                // Thêm assignedDate vào values trước khi gửi
                const formattedValues = {
                    ...values,
                    // LocalDateTime theo định dạng ISO
                    assignedDate: new Date().toISOString()
                };
                
                console.log('Sending with assignedDate:', formattedValues);
                onSubmit(formattedValues);
                form.resetFields();
            })
            .catch((error) => {
                console.log('Validation failed:', error);
                // Không đóng modal khi validation thất bại
            })
            .finally(() => {
                setSubmitLoading(false);
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
            confirmLoading={submitLoading}
            okButtonProps={{ htmlType: 'submit' }}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ mentors: [] }}
            >              
                <Form.Item 
                    name="name" 
                    label="Tên môn học" 
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên môn học!' },
                        { max: 100, message: 'Tên môn học không được vượt quá 100 ký tự!' }
                    ]}
                >
                    <Input disabled={!!initialValues} />
                </Form.Item>
                
                <Form.Item 
                    name="description" 
                    label="Mô tả"
                    rules={[
                        { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự!' }
                    ]}
                >
                    <Input.TextArea 
                        showCount 
                        maxLength={1000} 
                        style={{ height: 100 }} 
                    />
                </Form.Item>
                
                <Form.Item 
                    name="content" 
                    label="Nội dung"
                    rules={[
                        { required: true, message: 'Vui lòng nhập nội dung môn học!' }
                    ]}
                >
                    <Input.TextArea style={{ height: 150 }} />
                </Form.Item>
                
                <Form.Item 
                    name="references" 
                    label="Tài liệu tham khảo"
                    rules={[
                        { max: 1000, message: 'Tài liệu tham khảo không được vượt quá 1000 ký tự!' }
                    ]}
                >
                    <Input.TextArea 
                        showCount 
                        maxLength={1000} 
                        style={{ height: 100 }} 
                    />
                </Form.Item>
                
                <Form.Item 
                    name="mentors" 
                    label="Mentors"
                    tooltip="Chọn mentor từ danh sách hoặc nhập username mới"
                >
                    <Select 
                        mode="tags" 
                        style={{ width: '100%' }} 
                        placeholder="Chọn mentor hoặc nhập username"
                        notFoundContent={null}
                        optionLabelProp="label"
                        optionFilterProp="label"
                    >
                        {mentorsList.map(mentor => (
                            <Select.Option 
                                key={mentor.username} 
                                value={mentor.username}
                                label={`${mentor.fullName} (${mentor.username})`}
                            >
                                <div>
                                    <div>{mentor.fullName}</div>
                                    <div style={{ color: '#888', fontSize: '12px' }}>{mentor.username}</div>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubjectFormPopup;