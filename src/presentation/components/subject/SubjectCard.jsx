import React from 'react';
import { Card, Tag } from 'antd';

const SubjectCard = ({ subject }) => (
    <Card title={subject.name}>
        <p><b>Mã:</b> {subject.subjectId}</p>
        <p><b>Mô tả:</b> {subject.description}</p>
        <p><b>Nội dung:</b> {subject.content}</p>
        <p><b>Mentors:</b> {subject.mentors.map(m => <Tag key={m}>{m}</Tag>)}</p>
    </Card>
);

export default SubjectCard;
