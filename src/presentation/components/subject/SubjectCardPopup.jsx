// SubjectCard.jsx
import React from 'react';
import { Card, Tag, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SubjectCard = ({ subject, onClick, onEdit, onDelete }) => {
    return (
        <Card
            title={subject.name}
            onClick={onClick}
            extra={<Tag color="blue">{subject.subjectId}</Tag>}
            style={{ marginBottom: 16 }}
        >
            <p><b>Mô tả:</b> {subject.description}</p>
            <p><b>Mentors:</b> <Space>{subject.mentors?.map(m => <Tag key={m}>{m}</Tag>)}</Space></p>
            <Space>
                <Button
                    icon={<EditOutlined />}
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                >
                    Sửa
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                >
                    Xoá
                </Button>
            </Space>
        </Card>
    );
};

export default SubjectCard;
