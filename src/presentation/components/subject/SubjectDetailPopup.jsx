import React from 'react';
import { Modal, Descriptions, Button } from 'antd';

const SubjectDetailPopup = ({ subject, visible, onEdit, onDelete, onClose }) => (
    <Modal
        title={`Thông tin môn học: ${subject.name}`}
        open={visible}
        onCancel={onClose}
        footer={[
            <Button key="edit" onClick={onEdit}>Sửa</Button>,
            <Button key="delete" danger onClick={onDelete}>Xoá</Button>,
        ]}
    >
        <Descriptions bordered column={1}>
            <Descriptions.Item label="Mã môn">{subject.subjectId}</Descriptions.Item>
            <Descriptions.Item label="Tên môn học">{subject.name}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{subject.description}</Descriptions.Item>
            <Descriptions.Item label="Nội dung">{subject.content}</Descriptions.Item>
            <Descriptions.Item label="Tài liệu tham khảo">{subject.references}</Descriptions.Item>
            <Descriptions.Item label="Mentors">{subject.mentors.join(', ')}</Descriptions.Item>
        </Descriptions>
    </Modal>
);

export default SubjectDetailPopup;
