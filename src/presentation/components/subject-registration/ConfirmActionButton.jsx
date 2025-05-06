import React from 'react';
import { Button, Popconfirm } from 'antd';

const ConfirmActionButton = ({ onConfirm, confirmText, cancelText, title, children, danger = false, ...props }) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Popconfirm
            title={title}
            onConfirm={(e) => { e.stopPropagation(); onConfirm(); }}
            okText={confirmText || 'Đồng ý'}
            cancelText={cancelText || 'Huỷ'}
        >
            <Button onClick={handleClick} danger={danger} {...props}>
                {children}
            </Button>
        </Popconfirm>
    );
};

export default ConfirmActionButton;
