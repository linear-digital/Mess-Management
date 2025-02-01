import { auth } from '@/util/firebase/firebase.init';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

const AssignNew = ({ refetch, setOpen }: { refetch: () => void, setOpen: any }) => {
    const [user] = useAuthState(auth);
    const times = ["Afternoon", "Night"]
    const onSubmit = async (data: any) => {
        try {
            const { time, quantity, price, date } = data

            const newItem = {
                time,
                quantity,
                price,
                date: new Date(date),
                email: user?.email
            }
            const res = await axios.post('/api/mils', newItem)
            toast.success(res.data.message)
            refetch()
            // console.log(newItem);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    return (
        <Form
            layout='vertical'
            className='mt-5'
            onFinish={onSubmit}
            initialValues={{
                time: "",
                quantity: 1,
                price: 70
            }}
        >
            <Form.Item
                name={"time"}
                label={"Time"}
                rules={[{ required: true, message: "Time is required" }]}
            >
                <Select >
                    <Select.Option value="">
                        Select Time
                    </Select.Option>
                    {
                        times.map((time, index) => (
                            <Select.Option key={index} value={time}>
                                {time}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name={"quantity"}
                label={"Quantity"}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                name={"price"}
                label={"Price"}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                name={"date"}
                label={"Date"}
                rules={[{ required: true, message: "Date is required" }]}
            >
                <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item

            >
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AssignNew;