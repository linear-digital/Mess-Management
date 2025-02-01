"use client";
import { Avatar, Table, Tooltip } from "antd";
import moment from "moment";
import React from "react";

const RecentExpencess = () => {
  const dataSources = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  return (
    <div className="card bg-base-100 w-full shadow-xl p-5">
      <h2 className="text-xl">Expencess</h2>
      <Table
        rootClassName="bg-base-100"
        rowClassName={() => "bg-base-100 text-white hover:text-black"}
        size="small"
        pagination={false}
        className="mt-5"
        scroll={{ y: 500 }}
        dataSource={dataSources}
        columns={[
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text, record: any) => (
             <div>{moment().format("dddd Do MMM YYYY,")}</div>
            ),
          },
          {
            title: "Source",
            dataIndex: "source",
            key: "source",
            render: (text, record: any) => (
              <Tooltip title=" বাজার করা হয়েছে">বাজার করা হয়েছে</Tooltip>
            ),
          },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text, record: any) => <div>500 ৳</div>,
          },
        ]}
        
        footer={() => (
          <div className="flex justify-between">
            <div className="text-base">Total</div>
            <div className="text-base">5000 ৳</div>
          </div>
        )}
      />
    </div>
  );
};

export default RecentExpencess;
