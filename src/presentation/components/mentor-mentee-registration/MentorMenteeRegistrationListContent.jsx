import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
// import axios from 'axios';
import dayjs from 'dayjs';

const MentorMenteeRegistrationListContent = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ mentorName: '', menteeName: '' });
    const [sorter, setSorter] = useState({ field: null, order: null });

    const fetchData = async (page = 1, pageSize = 5, filters = {}, sorter = {}) => {
        setLoading(true);
        // const response = await axios.get('/api/mentor-mentee-registrations', {
        //     params: {
        //         page,
        //         pageSize,
        //         mentorName: filters.mentorName,
        //         menteeName: filters.menteeName,
        //         sortField: sorter.field,
        //         sortOrder: sorter.order,
        //     },
        // });
        const response = {
            data: {
                items: [
                    { menteeId: 1, menteeName: 'Nguyen Van A', mentorId: 101, mentorName: 'Tran Van B', registrationDate: '2023-10-01' },
                    { menteeId: 2, menteeName: 'Nguyen Van B', mentorId: 102, mentorName: 'Le Thi C', registrationDate: '2023-10-02' },
                    // ... more data
                ],
                total: 100,
            },
        };
        setData(response.data.items);
        setPagination({ current: page, pageSize, total: response.data.total });
        setLoading(false);
    };

    const handleTableChange = (pagination, _filters, sorter) => {
        setPagination(pagination);
        setSorter({ field: sorter.field, order: sorter.order });
        fetchData(pagination.current, pagination.pageSize, filters, sorter);
    };

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        fetchData(1, pagination.pageSize, newFilters, sorter); // reset về page 1
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Tên mentee',
            dataIndex: 'menteeName',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm mentee"
                        value={selectedKeys[0]}
                        onChange={e => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm();
                            handleFilterChange('menteeName', e.target.value);
                        }}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
        },
        {
            title: 'Tên mentor',
            dataIndex: 'mentorName',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm mentor"
                        value={selectedKeys[0]}
                        onChange={e => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm();
                            handleFilterChange('mentorName', e.target.value);
                        }}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'registrationDate',
            render: date => dayjs(date).format('DD/MM/YYYY'),
            sorter: true,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={record => `${record.menteeId}_${record.mentorId}`}
            pagination={pagination}
            onChange={handleTableChange}
        />
    );
};

export default MentorMenteeRegistrationListContent;
