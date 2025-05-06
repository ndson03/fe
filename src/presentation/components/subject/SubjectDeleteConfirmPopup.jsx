import React from 'react';
import { Modal } from 'antd';

const SubjectDeleteConfirmPopup = ({ visible, message, onConfirm, onCancel }) => (
  <Modal
    open={visible}
    onOk={onConfirm}
    onCancel={onCancel}
    okText="Xoá"
    cancelText="Huỷ"
    title="Xác nhận"
  >
    <p>{message}</p>
  </Modal>
);

export default SubjectDeleteConfirmPopup;
