import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Table,
  TableProps,
} from "antd";
import React from "react";
import AssignNew from "./AssignNew";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/util/firebase/firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import Statistics from "./Statistics";
import PaymentHistory from "./PaymentHistory";

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handlerCencel = () => {
    setOpen(false);
  };
  const [date, setDate] = React.useState<any>(null);

  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["mils", user?.email, date],
    queryFn: () =>
      axios
        .get("/api/mils", {
          params: {
            email: user?.email,
            month: date ? new Date(date): '',
          },
        })
        .then((res) => res.data),
    enabled: !!user,
  });

  const logOut = () => {
    auth.signOut();
  };
  const deleteData = async (id: any) => {
    try {
      await axios.delete(`/api/mils?id=${id}`);
      refetch();
      toast.success("Data deleted successfully");
    } catch (error) {
      toast.error("Internal server error");
    }
  };
  const columns: TableProps<any>["columns"] = [
    {
      title: (
        <div>
          <span>Date</span>{" "}
          <DatePicker onChange={(date: any) => setDate(date)} mode="month" needConfirm/>
        </div>
      ),
      dataIndex: "date",
      key: "date",
      render: (text: any) => moment(text).format("DD  MMM dddd YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: any) => `৳${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Are you sure to delete this data?"
          onConfirm={() => deleteData(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const [pay, setPay] = React.useState(false);
  const payBill = async (data: { amount: number }) => {
    try {
      await axios.put("/api/user", data, {
        params: {
          email: user?.email,
        },
      });
      refetch();
      toast.success("Data updated successfully");
    } catch (error) {
      toast.error("Internal server error");
    }
  };
  const [showHistory, setShowHistory] = React.useState(false);
  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="container mx-auto text-black p-4">
      <Modal
        title="Payment History"
        open={showHistory}
        onOk={() => setShowHistory(false)}
        onCancel={() => setShowHistory(false)}
      >
        <Form
          layout="vertical"
          initialValues={{
            amount: 0,
          }}
          onFinish={payBill}
          className="max-w-[400px] mb-4"
        >
          <Form.Item label="Amount" name="amount">
            <Input placeholder="Enter Amount" type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
        <PaymentHistory history={data?.user?.history} />
      </Modal>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl py-2">Hello {user?.displayName}!</h1>
        <Button danger onClick={logOut}>
          Logout
        </Button>
      </div>
      <div className="flex gap-5 items-center">
        <Button
          type="primary"
          size="large"
          className="my-5"
          onClick={() => setOpen(true)}
        >
          Assign New
        </Button>

        <Button
          size="large"
          className="my-5"
          onClick={() => setShowHistory(!showHistory)}
        >
          Payment History
        </Button>
      </div>
      <Statistics data={data} />
      <Modal
        open={open}
        onOk={handlerCencel}
        onCancel={handlerCencel}
        title="Assign New"
        footer={null}
      >
        <AssignNew refetch={refetch} setOpen={setOpen} />
      </Modal>
      <Table
        dataSource={data?.data || []}
        columns={columns}
        bordered
        pagination={{ pageSize: 20 }}
        scroll={{ x: true }}
        size="small"
      />
    </div>
  );
};

export default HomePage;
