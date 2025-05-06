import React from 'react';
import { Modal, Tag } from 'antd';
import ConfirmActionButton from './ConfirmActionButton';

const SubjectDetailPopup = ({ visible, subject, isRegistered, onRegister, onUnregister, onClose }) => {
    return (
        <Modal
            title={subject?.name}
            open={visible}
            onCancel={onClose}
            footer={[
                isRegistered ? (
                    <ConfirmActionButton
                        key="unregister"
                        title="Bạn có chắc muốn huỷ đăng ký môn học này?"
                        onConfirm={onUnregister}
                        danger
                    >
                        Huỷ đăng ký
                    </ConfirmActionButton>
                ) : (
                    <ConfirmActionButton
                        key="register"
                        title="Bạn muốn đăng ký môn học này?"
                        onConfirm={onRegister}
                    >
                        Đăng ký môn học
                    </ConfirmActionButton>
                ),
            ]}
        >
            <p><strong>Mô tả:</strong> {subject?.description}</p>
            <p><strong>Nội dung:</strong> {subject?.content}</p>
            <p><strong>Tài liệu tham khảo:</strong> {subject?.references}</p>
            <p><strong>Mentors:</strong> {(subject?.mentors || []).map(m => <Tag key={m}>{m}</Tag>)}</p>
        </Modal>
    );
};

export default SubjectDetailPopup;
