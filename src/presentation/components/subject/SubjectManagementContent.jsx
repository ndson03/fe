// SubjectManagementContent.jsx - With External Mentor API
import React, { useState, useEffect } from 'react';
import { Button, Table, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SubjectFormPopup from './SubjectFormPopup';
import SubjectDetailPopup from './SubjectDetailPopup';
import SubjectDeleteConfirmPopup from './SubjectDeleteConfirmPopup';
import { useSubjects } from '../../../application/hooks/useSubject';
import axios from 'axios'; // Thêm axios để gọi API

const SubjectManagementContent = () => {
    const {
        subjects,
        pagination,
        isLoading,
        isError,
        message,
        handleCreateSubject,
        handleUpdateSubject,
        handleDeleteSubject,
        handlePageChange
    } = useSubjects();

    // Local state for UI management
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editSubject, setEditSubject] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [mentorsList, setMentorsList] = useState([]);

    // Show error notification if API call fails
    useEffect(() => {
        if (isError) {
            notification.error({
                message: 'Error',
                description: message || 'Something went wrong',
            });
        }
    }, [isError, message]);

    // Tải danh sách mentor từ API và cũng hỗ trợ trích xuất từ subjects
    useEffect(() => {
        // Mảng để lưu tất cả mentors (từ API và từ subjects)
        let allMentors = [];
        const mentorMap = new Map();
        
        // Function để thêm mentor vào map
        const addMentorToMap = (username, fullName) => {
            if (username && !mentorMap.has(username)) {
                mentorMap.set(username, { username, fullName: fullName || username });
            }
        };
        
        // 1. Trích xuất mentor từ subjects
        if (subjects && subjects.length > 0) {
            subjects.forEach(subject => {
                if (subject.mentors && Array.isArray(subject.mentors)) {
                    subject.mentors.forEach(mentor => {
                        let username, fullName;

                        if (typeof mentor === 'object') {
                            // Handle mentor object structure
                            if (mentor.user) {
                                username = mentor.user.username;
                                fullName = mentor.user.name || mentor.user.username;
                            } else {
                                username = mentor.username;
                                fullName = mentor.name || mentor.username;
                            }
                        } else if (typeof mentor === 'string') {
                            username = mentor;
                            fullName = mentor;
                        }

                        addMentorToMap(username, fullName);
                    });
                }
            });
        }
        
        // 2. Tải danh sách mentor từ API
        const fetchMentors = async () => {
            try {
                // Đổi cổng cho API - sử dụng URL đầy đủ với cổng cụ thể
                // Ví dụ: nếu API chạy trên cổng 8080
                const apiUrl = 'http://localhost:3000/mentors';
                
                const response = await axios.get(apiUrl);
                
                // Kiểm tra và thêm mentors từ API vào map
                if (response.data && Array.isArray(response.data)) {
                    response.data.forEach(mentor => {
                        const username = mentor.username;
                        const fullName = mentor.fullName || mentor.name || mentor.username;
                        addMentorToMap(username, fullName);
                    });
                }
            } catch (error) {
                console.error('Failed to fetch mentors:', error);
                // Chỉ hiển thị notification nếu không có mentors nào từ subjects
                if (mentorMap.size === 0) {
                    notification.warning({
                        message: 'Cảnh báo',
                        description: 'Không thể tải danh sách mentor từ API. Sử dụng dữ liệu từ môn học.',
                    });
                }
            } finally {
                // Chuyển map thành mảng
                mentorMap.forEach(value => {
                    allMentors.push(value);
                });
                
                // Sắp xếp theo tên đầy đủ
                allMentors.sort((a, b) => a.fullName.localeCompare(b.fullName));
                
                setMentorsList(allMentors);
                console.log('Combined mentors list (API + subjects):', allMentors);
            }
        };

        // Gọi hàm tải mentors từ API
        fetchMentors();
        
    }, [subjects]); // Giữ nguyên dependency để đảm bảo chạy lại khi subjects thay đổi

    // Handler for creating a new subject
    const handleCreate = () => {
        setEditSubject(null);
        setSelectedSubject(null);
        setShowForm(true);
    };

    // Handler for editing a subject
    const handleEdit = (record) => {
        console.log('Record trước khi edit:', record);
        
        // Extract mentor usernames correctly
        const mentorUsernames = [];
        if (record.mentors && Array.isArray(record.mentors)) {
            record.mentors.forEach(mentor => {
                if (typeof mentor === 'object') {
                    // If mentor is an object with username property
                    if (mentor.username) {
                        mentorUsernames.push(mentor.username);
                    } else if (mentor.user && mentor.user.username) {
                        // Handle nested user object if needed
                        mentorUsernames.push(mentor.user.username);
                    }
                } else if (typeof mentor === 'string') {
                    mentorUsernames.push(mentor);
                }
            });
        }
        
        const subjectForEdit = {
            subjectId: record.id,
            name: record.name,
            description: record.description || '',
            content: record.content || '',
            references: record.refs || '',
            mentors: mentorUsernames // These are usernames, not objects
        };
        
        console.log('Đối tượng sau khi map:', subjectForEdit);
        
        setEditSubject(subjectForEdit);
        setSelectedSubject(null);
        setShowForm(true);
    };

    // Handler for deleting a subject
    const handleDelete = (subject) => {
        handleDeleteSubject(subject.id);
        setConfirmDelete(null);
        setSelectedSubject(null);
    };

    // Handler for saving a subject (create or update)
    const handleSave = (values) => {
        // FIXED: Map form values to API model correctly
        const subjectData = {
            description: values.description || '',
            content: values.content || '',
            refs: values.references || '',
            // FIXED: Use mentorUsernameList instead of mentorUserNameList
            mentorUsernameList: values.mentors || [],
            assignedDate: values.assignedDate
        };

        console.log('Subject data before submission:', subjectData);

        if (editSubject) {
            // For update, include the ID
            handleUpdateSubject({
                ...subjectData,
                id: editSubject.subjectId
            });
        } else {
            // For create, include name
            handleCreateSubject({
                ...subjectData,
                name: values.name
            });
        }
        
        setShowForm(false);
    };

    // Table columns
    const columns = [
        {
            title: 'Mã môn',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Mentors',
            dataIndex: 'mentors',
            key: 'mentors',
            render: mentors => {
                if (!mentors || !Array.isArray(mentors) || mentors.length === 0) return 'N/A';
                return mentors.map(m => {
                    if (typeof m === 'object') {
                        // Check for user.username, user.name, and direct username/name
                        if (m.user) {
                            return m.user.name || m.user.username || 'Unnamed';
                        }
                        return m.name || m.username || 'Unnamed';
                    }
                    return m;
                }).join(', ');
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={(e) => { e.stopPropagation(); handleEdit(record); }}>Sửa</Button>
                    <Button danger onClick={(e) => { e.stopPropagation(); setConfirmDelete(record); }}>Xoá</Button>
                </>
            ),
        }
    ];

    // Format subject data for better table display and detail view
    const formattedSubjects = subjects.map(subject => ({
        ...subject,
        key: subject.id,
    }));

    // Prepare selected subject for detail view
    const prepareSelectedSubjectForDetail = (subject) => {
        if (!subject) return null;
        
        const mentorNames = [];
        if (subject.mentors && Array.isArray(subject.mentors)) {
            subject.mentors.forEach(mentor => {
                if (typeof mentor === 'object') {
                    if (mentor.user) {
                        mentorNames.push(mentor.user.name || mentor.user.username || 'Unnamed');
                    } else {
                        mentorNames.push(mentor.name || mentor.username || 'Unnamed');
                    }
                } else if (typeof mentor === 'string') {
                    mentorNames.push(mentor);
                }
            });
        }
        
        return {
            subjectId: subject.id,
            name: subject.name,
            description: subject.description,
            content: subject.content,
            references: subject.refs,
            mentors: mentorNames,
            assignedDate: subject.assignedDate
        };
    };

    return (
        <div>
            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleCreate} 
                style={{ marginBottom: 16 }}
            >
                Tạo môn học
            </Button>
            
            <Table
                loading={isLoading}
                rowKey="id"
                columns={columns}
                dataSource={formattedSubjects}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: handlePageChange
                }}
                onRow={(record) => ({
                    onClick: () => setSelectedSubject(record),
                })}
            />

            <SubjectFormPopup
                visible={showForm}
                onCancel={() => setShowForm(false)}
                onSubmit={handleSave}
                initialValues={editSubject}
                mentorsList={mentorsList}
            />

            {selectedSubject && (
                <SubjectDetailPopup
                    subject={prepareSelectedSubjectForDetail(selectedSubject)}
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

export default SubjectManagementContent;