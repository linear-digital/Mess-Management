"use client";

import { auth } from "@/util/firebase/firebase.init";
import { updateAccess } from "@/util/role";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Table } from "antd";
import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const page = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-members"],
    queryFn: async () => {
      const res = await axios.get("/api/user");
      return res.data;
    },
  });
  const [user] = useAuthState(auth);
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get("/api/user", {
        params: {
          email: user?.email,
        },
      });
      return res.data;
    },
    enabled: !!user,
  });
  const makeManager = async (email: string, role: string) => {
    try {
      if (role === "Manager") {
        await axios.put(`/api/user?email=${email}&update=true`, {
          role: "Member",
        });
        toast.success("User is now a member");
        refetch();
      } else {
        await axios.put(`/api/user?email=${email}&update=true`, {
          role: "Manager",
        });
        toast.success("User is now a manager");
        refetch();
      }
    } catch (error) {}
  };
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold">All Members</h1>
      <Table
        className="mt-10"
        size="small"
        loading={isLoading}
        dataSource={data}
        pagination={false}
        rowKey={(record: any) => record?._id}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record: any) => (
              <div className="flex items-center gap-x-3">
                <Avatar src={record?.profilePic} size={30} />
                <span className="font-medium">{text}</span>
              </div>
            ),
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text, record: any) => (
              <div>
                <span className="font-medium">{text}</span>
              </div>
            ),
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text, record: any) => (
              <div>
                <span className="font-medium">{text}</span>
              </div>
            ),
          },
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record: any) => (
              <div>
                <Button
                  disabled={!updateAccess.includes(currentUser?.role)}
                  onClick={() => makeManager(record?.email, record?.role)}
                  type="primary"
                  danger={record?.role === "Member"}
                  size="small"
                >
                  {record?.role === "Manager" ? "Make Member" : "Make Manager"}
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default page;
