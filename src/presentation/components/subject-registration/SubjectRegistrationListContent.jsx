import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
// import axios from 'axios';
import dayjs from 'dayjs';

const SubjectRegistrationListContent = () => {
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({ studentName: '', subjectName: '' });
	const [sorter, setSorter] = useState({ field: null, order: null });

	const fetchData = async (page = 1, pageSize = 5, filters = {}, sorter = {}) => {
		setLoading(true);
		// const response = await axios.get('/api/registrations', {
		// 	params: {
		// 		page,
		// 		pageSize,
		// 		studentName: filters.studentName,
		// 		subjectName: filters.subjectName,
		// 		sortField: sorter.field,
		// 		sortOrder: sorter.order,
		// 	},
		// });
		const response = {
			data: {
				items: [
					{ studentId: 1, studentName: 'Nguyen Van A', subjectId: 101, subjectName: 'Toan', registrationDate: '2023-10-01' },
					{ studentId: 2, studentName: 'Nguyen Van B', subjectId: 102, subjectName: 'Ly', registrationDate: '2023-10-02' },
					// ... more data
				],
				total: 100,
			},
		}
		setData(response.data.items);
		setPagination({ current: page, pageSize, total: response.data.total });
		setLoading(false);
	};

	const handleTableChange = (pagination, _filters, sorter) => {
		setPagination(pagination);
		setSorter({
			field: sorter.field,
			order: sorter.order,
		});
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
			title: 'Tên sinh viên',
			dataIndex: 'studentName',
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Tìm sinh viên"
						value={selectedKeys[0]}
						onChange={e => {
							setSelectedKeys(e.target.value ? [e.target.value] : []);
							confirm();
							handleFilterChange('studentName', e.target.value);
						}}
						style={{ width: 188, marginBottom: 8, display: 'block' }}
					/>
				</div>
			),
			onFilterDropdownVisibleChange: visible => {
				if (!visible) fetchData(pagination.current, pagination.pageSize, filters, sorter);
			},
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectName',
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Tìm môn học"
						value={selectedKeys[0]}
						onChange={e => {
							setSelectedKeys(e.target.value ? [e.target.value] : []);
							confirm();
							handleFilterChange('subjectName', e.target.value);
						}}
						style={{ width: 188, marginBottom: 8, display: 'block' }}
					/>
				</div>
			),
		},
		{
			title: 'Ngày đăng ký',
			dataIndex: 'registrationDate',
			render: (date) => dayjs(date).format('DD/MM/YYYY'),
			sorter: true,
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				dataSource={data}
				loading={loading}
				rowKey={(record) => `${record.studentId}_${record.subjectId}`}
				pagination={pagination}
				onChange={handleTableChange}
			/>
		</div>
	);
};

export default SubjectRegistrationListContent;
