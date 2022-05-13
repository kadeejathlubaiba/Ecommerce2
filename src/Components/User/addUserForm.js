import "./users.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Select } from "antd";
import "./users.css";

function AdduserForm() {
  let navigate = useNavigate();
  const mov = () => {
    navigate("/user");
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetch("http://localhost/ecommerce-backend/api/users/create_user.php", {
      body: JSON.stringify(values),
      method: "POST",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "success") {
            console.log(result);
            message.success(result.message);
            form.resetFields();
          } else {
            message.error(result.message);
          }
        },
        (error) => {
          console.log(error);
          message.error(error.message);
        }
      );
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label=" Name"
          name="userName"
          rules={[
            {
              required: true,
            },
            {
              type: "string",
              min: 3,
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="passwords"
          label="password"
          rules={[
            {
              required: true,
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,

              message:
                "Password must contain Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            },
          ]}
        >
          <Input type="password" placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="phoneNumber"
          rules={[
            {
              required: true,
              min: 10,
              max: 12,
            },
          ]}
        >
          <Input placeholder="Enter phoneNumber" />
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
          <Select placeholder="Select Gender" allowClear>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
                    name="profilePicture"
                    label="profilePicture"
                >
                    <Input.TextArea placeholder="profilePicture" />
                </Form.Item> */}
        <Form.Item>
          <div className="btn-u">
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="button" onClick={mov}>
                Back
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default AdduserForm;
