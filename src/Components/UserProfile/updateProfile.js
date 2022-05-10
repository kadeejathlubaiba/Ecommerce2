
import React, { useEffect } from "react";
import { Form, Input, message, Button, Space, Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { PostWithAuthToken } from "../../Config/api";
import store from "../../store";
import { GetAdminDetails } from "../../Redux/Actions/authAction";
import { Alert } from 'antd';
import { useDispatch } from "react-redux";


function UpdateProfile() {
  
  const mov = () => {
    navigate('/profile');
}
const onReset = () => {
    form.resetFields();
};
  let navigate = useNavigate();
  const [form] = Form.useForm();
  let Details = store.getState().auth.auth.data;

  const dispatch =useDispatch();
  useEffect(() => {
    dispatch(GetAdminDetails());
    if (localStorage.getItem("token")) {
         console.log(Details);
         form.setFieldsValue({
           userId:Details.userId,
           userName:Details.userName,
           email:Details.email,
           phoneNumber: Details.phoneNumber,
           gender:Details.gender
       });
    } else {
      navigate("/");
    }
  }, [form]);
  const onFinish = (values) => {
      let data = JSON.stringify(values)
    console.log(data);
    PostWithAuthToken('users/update_users.php',data)
      .then((res)=>{
        console.log(res);
      <Alert message="success" description="Profile updates successfully" type="success" showIcon closable />
      } );
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div className="editForm">
      <Card title='Update Profile'>
        <Form
          validateMessages={validateMessages}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off" >
          <Form.Item
            name="userId" >
            <Input style={{"display":"none"}} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="userName"
            rules={[
              {
                required: true,
              },
            ]} >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                  required: true,
                type: "email",
              },
            ]} >
            <Input placeholder="Enter Email" />
          </Form.Item>
          
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                min: 10,
                max: 12,
              },
            ]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Gender" >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
         
          <Form.Item>
              <div id="butn">
              <Space>
              <Button type="primary" htmlType="submit" > Update </Button>
              <Button htmlType="button" onClick={onReset}> Reset </Button>
             <Button type="primary" htmlType="button" onClick={mov}> Back </Button>
            </Space>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateProfile;
