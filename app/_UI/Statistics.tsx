import { Card } from 'antd';
import React from 'react';

const Statistics = ({ data }: { data: any }) => {
    return (
        <Card className='max-w-[300px] text-base font-medium mb-5'>
            <p>Total: {data.total}</p>
            <p>Total Bill: {data.totalBill} TK </p>
            <p>Paid  : {data.paid} TK</p>
            <p>Unpaid : {data.bill} TK</p>
        </Card>
    );
};

export default Statistics;