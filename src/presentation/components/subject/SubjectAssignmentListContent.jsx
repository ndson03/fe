import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SubjectFormPopup from './SubjectFormPopup';
import SubjectDetailPopup from './SubjectDetailPopup';
import SubjectDeleteConfirmPopup from './SubjectDeleteConfirmPopup';

const defaultSubjects = [
    {
        subjectId: 'M001',
        name: 'Cấu trúc dữ liệu',
        description: 'Học về các cấu trúc cơ bản trong lập trình.',
        content: 'Array, Linked List, Tree, Graph',
        references: 'CLRS, Sách Đại học',
        mentors: ['Nguyễn Văn A', 'Trần Thị B'],
    },
];

const SubjectManagement = () => {
    const [subjects, setSubjects] = useState(defaultSubjects);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editSubject, setEditSubject] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleCreate = () => {
        setEditSubject(null);
        setSelectedSubject(null);
        setShowForm(true);
    };

    const handleEdit = (record) => {
        setEditSubject(record);
        setSelectedSubject(null);
        setShowForm(true);
    };

    const handleDelete = (subject) => {
        setSubjects(subjects.filter((s) => s.subjectId !== subject.subjectId));
        setConfirmDelete(null);
        setSelectedSubject(null);
    };

    const handleSave = (values) => {
        if (editSubject) {
            setSubjects(subjects.map((s) => (s.subjectId === editSubject.subjectId ? values : s)));
        } else {
            setSubjects([...subjects, values]);
        }
        setShowForm(false);
    };

    const columns = [
        {
            title: 'Mã môn',
            dataIndex: 'subjectId',
            sorter: (a, b) => a.subjectId.localeCompare(b.subjectId),
        },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filters: [
                { text: 'Cấu trúc dữ liệu', value: 'Cấu trúc dữ liệu' },
                { text: 'Giải thuật', value: 'Giải thuật' },
            ],
            onFilter: (value, record) => record.name.includes(value),
        },
        {
            title: 'Mentors',
            dataIndex: 'mentors',
            render: mentors => mentors.join(', '),
            sorter: (a, b) => a.mentors.length - b.mentors.length,
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button onClick={(e) => { e.stopPropagation(); handleEdit(record); }}>Sửa</Button>
                    <Button danger onClick={(e) => { e.stopPropagation(); setConfirmDelete(record); }}>Xoá</Button>
                </>
            ),
        }
    ];
      

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
                Tạo môn học
            </Button>
            <Table
                rowKey="subjectId"
                columns={columns}
                dataSource={subjects}
                pagination={{ pageSize: 5 }}
                onRow={(record) => ({
                    onClick: () => setSelectedSubject(record),
                })}
            />

            <SubjectFormPopup
                visible={showForm}
                onCancel={() => setShowForm(false)}
                onSubmit={handleSave}
                initialValues={editSubject}
            />

            {selectedSubject && (
                <SubjectDetailPopup
                    subject={selectedSubject}
                    visible={!!selectedSubject}
                    onEdit={() => handleEdit(selectedSubject)}
                    onDelete={() => setConfirmDelete(selectedSubject)}
                    onClose={() => setSelectedSubject(null)}
                />
            )}

            {confirmDelete && (
                <SubjectDeleteConfirmPopup
                    visible={!!confirmDelete}
                    onConfirm={() => handleDelete(confirmDelete)}
                    onCancel={() => setConfirmDelete(null)}
                    message={`Xác nhận xoá môn học "${confirmDelete.name}"?`}
                />
            )}
        </div>
    );
};

export default SubjectManagement;
