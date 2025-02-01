"use client";
import { Avatar, Table } from "antd";
import moment from "moment";
import React from "react";

const MealStatistics = () => {
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
      <h2 className="text-xl">Recent Meals</h2>
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
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record: any) => (
              <div>
                <Avatar
                  size={30}
                  src={record?.avatar}
                  className="bg-gray-400"
                />
                <span className="ml-2 font-medium">M.r User</span>
              </div>
            ),
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text, record: any) => (
              <div>{moment().format("dddd Do MMM YYYY,")}</div>
            ),
          },
          {
            title: "Count",
            dataIndex: "count",
            key: "count",
            render: (text, record: any) => <div>2</div>,
          },
        ]}
      />
    </div>
  );
};

export default MealStatistics;
