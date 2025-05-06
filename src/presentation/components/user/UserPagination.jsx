import { Table } from 'antd';
import React from 'react';

const UserPagination = ({ users, columns, onRowClick }) => (
    <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({ onClick: () => onRowClick(record) })}
    />
);

export default UserPagination;
