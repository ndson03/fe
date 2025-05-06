import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import SubjectDetailPopup from './SubjectDetailPopup';
import ConfirmActionButton from './ConfirmActionButton';

const MenteeSubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [registeredIds, setRegisteredIds] = useState(new Set());
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSubjects = async () => {
        setLoading(true);
        const res = await axios.get('/api/subjects');
        setSubjects(res.data);
        setLoading(false);
    };

    const fetchRegisteredSubjects = async () => {
        const res = await axios.get('/api/mentee-registered-subjects'); // trả về mảng ID
        setRegisteredIds(new Set(res.data));
    };

    useEffect(() => {
        fetchSubjects();
        fetchRegisteredSubjects();
    }, []);

    const handleRegister = async (subjectId) => {
        await axios.post(`/api/mentee/register-subject`, { subjectId });
        await fetchRegisteredSubjects();
    };

    const handleUnregister = async (subjectId) => {
        await axios.post(`/api/mentee/unregister-subject`, { subjectId });
        await fetchRegisteredSubjects();
    };

    const columns = [
        { title: 'Mã môn học', dataIndex: 'subjectId' },
        { title: 'Tên môn học', dataIndex: 'name' },
        { title: 'Mentors', dataIndex: 'mentors', render: mentors => mentors.map(m => <Tag key={m}>{m}</Tag>) },
        {
            title: 'Trạng thái',
            render: (_, record) => {
                const isRegistered = registeredIds.has(record.subjectId);
                return isRegistered ? <Tag color="green">Đã đăng ký</Tag> : <Tag color="red">Chưa đăng ký</Tag>;
            }
        },
        {
            title: 'Hành động',
            render: (_, record) => {
                const isRegistered = registeredIds.has(record.subjectId);
                return isRegistered ? (
                    <ConfirmActionButton
                        title="Bạn chắc chắn muốn huỷ đăng ký môn học này?"
                        onConfirm={() => handleUnregister(record.subjectId)}
                        danger
                    >
                        Huỷ đăng ký
                    </ConfirmActionButton>
                ) : (
                    <ConfirmActionButton
                        title="Bạn muốn đăng ký môn học này?"
                        onConfirm={() => handleRegister(record.subjectId)}
                    >
                        Đăng ký
                    </ConfirmActionButton>
                );
            }
        }
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={subjects}
                rowKey="subjectId"
                loading={loading}
                pagination={{ pageSize: 5 }}
                onRow={(record) => ({
                    onClick: () => setSelectedSubject(record),
                })}
            />
            {selectedSubject && (
                <SubjectDetailPopup
                    visible={!!selectedSubject}
                    subject={selectedSubject}
                    isRegistered={registeredIds.has(selectedSubject.subjectId)}
                    onRegister={() => {
                        handleRegister(selectedSubject.subjectId);
                        setSelectedSubject(null);
                    }}
                    onUnregister={() => {
                        handleUnregister(selectedSubject.subjectId);
                        setSelectedSubject(null);
                    }}
                    onClose={() => setSelectedSubject(null)}
                />
            )}
        </>
    );
};

export default MenteeSubjectList;
