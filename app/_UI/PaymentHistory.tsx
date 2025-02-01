import { Table, TableProps } from 'antd';
import moment from 'moment';
import React from 'react';

const PaymentHistory = ({ history }: { history: any }) => {
    const columns: TableProps<any>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: any) => moment(text).format('DD  MMM dddd YYYY'),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text: any) => text < 0 ? <del style={{ color: 'red' }}>৳{text}</del> : `৳${text}`
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={history?.reverse() || []} />
        </div>
    );
};

export default PaymentHistory;