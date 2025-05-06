import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import { toast } from './toast';
import ConfirmActionButton from './ConfirmActionButton';
import MentorDetailPopup from './MentorDetailPopup';

const MentorMenteeList = () => {
    const [mentors, setMentors] = useState([]);
    const [registeredIds, setRegisteredIds] = useState(new Set());
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMentors = async () => {
        setLoading(true);
        const res = await axios.get('/api/mentors');
        setMentors(res.data);
        setLoading(false);
    };

    const fetchRegistered = async () => {
        const res = await axios.get('/api/mentee-registered-mentors');
        setRegisteredIds(new Set(res.data));
    };

    useEffect(() => {
        fetchMentors();
        fetchRegistered();
    }, []);

    const handleRegister = async (mentorId) => {
        try {
            await axios.post('/api/mentee/register-mentor', { mentorId });
            toast.success('Đăng ký mentor thành công!');
            await fetchRegistered();
        } catch {
            toast.error('Đăng ký mentor thất bại!');
        }
    };

    const handleUnregister = async (mentorId) => {
        try {
            await axios.post('/api/mentee/unregister-mentor', { mentorId });
            toast.success('Huỷ đăng ký mentor thành công!');
            await fetchRegistered();
        } catch {
            toast.error('Huỷ đăng ký thất bại!');
        }
    };

    const columns = [
        { title: 'Tên mentor', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'SĐT', dataIndex: 'phone' },
        { title: 'Chuyên ngành', dataIndex: 'speciality' },
        {
            title: 'Trạng thái',
            render: (_, record) => {
                const isRegistered = registeredIds.has(record.id);
                return isRegistered ? <Tag color="green">Đã đăng ký</Tag> : <Tag color="red">Chưa đăng ký</Tag>;
            }
        },
        {
            title: 'Hành động',
            render: (_, record) => {
                const isRegistered = registeredIds.has(record.id);
                return isRegistered ? (
                    <ConfirmActionButton
                        title="Bạn có chắc muốn huỷ đăng ký mentor này?"
                        onConfirm={() => handleUnregister(record.id)}
                        danger
                    >
                        Huỷ đăng ký
                    </ConfirmActionButton>
                ) : (
                    <ConfirmActionButton
                        title="Bạn có chắc muốn đăng ký mentor này?"
                        onConfirm={() => handleRegister(record.id)}
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
                rowKey="id"
                columns={columns}
                dataSource={mentors}
                loading={loading}
                pagination={{ pageSize: 5 }}
                onRow={(record) => ({
                    onClick: () => setSelectedMentor(record),
                })}
            />

            {selectedMentor && (
                <MentorDetailPopup
                    visible={!!selectedMentor}
                    mentor={selectedMentor}
                    isRegistered={registeredIds.has(selectedMentor.id)}
                    onRegister={() => {
                        handleRegister(selectedMentor.id);
                        setSelectedMentor(null);
                    }}
                    onUnregister={() => {
                        handleUnregister(selectedMentor.id);
                        setSelectedMentor(null);
                    }}
                    onClose={() => setSelectedMentor(null)}
                />
            )}
        </>
    );
};

export default MentorMenteeList;
