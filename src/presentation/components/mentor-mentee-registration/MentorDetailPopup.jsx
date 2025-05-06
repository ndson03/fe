import React from 'react';
import { Modal, Typography } from 'antd';
import ConfirmActionButton from './ConfirmActionButton';

const MentorDetailPopup = ({ visible, mentor, isRegistered, onRegister, onUnregister, onClose }) => {
    return (
        <Modal
            title={mentor?.name}
            open={visible}
            onCancel={onClose}
            footer={[
                isRegistered ? (
                    <ConfirmActionButton
                        key="unregister"
                        title="Huỷ đăng ký mentor này?"
                        onConfirm={onUnregister}
                        danger
                    >
                        Huỷ đăng ký
                    </ConfirmActionButton>
                ) : (
                    <ConfirmActionButton
                        key="register"
                        title="Đăng ký mentor này?"
                        onConfirm={onRegister}
                    >
                        Đăng ký
                    </ConfirmActionButton>
                ),
            ]}
        >
            <p><strong>Email:</strong> {mentor?.email}</p>
            <p><strong>SĐT:</strong> {mentor?.phone}</p>
            <p><strong>Chuyên ngành:</strong> {mentor?.speciality}</p>
        </Modal>
    );
};

export default MentorDetailPopup;
