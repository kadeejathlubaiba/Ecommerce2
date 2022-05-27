import "../Layout/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Form, Input, message, Button, Space, Select } from "antd";
// import FileUpload from "./fileUpload";

function Addcustomer() {
  let navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const mov = () => {
    navigate("/customer");
  };

  useEffect(() => {
    fetch(
      `http://localhost/ecommerce-backend/api/customer/get_customerid.php`,
      {
        body: JSON.stringify({ customerId: location.state.customerId }),
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result[0].customerName);
          form.setFieldsValue({
            customerId: result[0].customerId,
            customerName: result[0].customerName,
            email: result[0].email,
            passwords: result[0].passwords,
            phoneNumber: result[0].phoneNumber,
            address: result[0].address,
            gender: result[0].gender,
            profilePicture: result[0].profilePicture,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onFinish = (values) => {
    console.log(values.customerId);
    if (values.customerId) {
      fetch(
        "http://localhost/ecommerce-backend/api/customer/edit_customer.php",
        { body: JSON.stringify(values), method: "PUT" }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(JSON.stringify(values));
            if (result.message === "success") {
              console.log(result);
              message.success(result.message);
              form.resetFields();
              navigate("/customer");
            } else {
              message.error(result.message);
            }
          },
          (error) => {
            console.log(error);
            message.error(error.message);
          }
        );
    } else {
      fetch(
        "http://localhost/ecommerce-backend/api/customer/create_customer.php",
        { body: JSON.stringify(values), method: "POST" }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            console.log(JSON.stringify(values));
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
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="customerId">
        <Input style={{ display: "none" }} />
      </Form.Item>
      <Form.Item
        label=" customerName"
        name="customerName"
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
      <Form.Item name="address" label="address">
        <Input.TextArea placeholder="address" />
      </Form.Item>
      {/* <FileUpload /> */}
      {/* <Form.Item name="profilePicture" label="profilePicture"></Form.Item> */}

      <Form.Item>
        <br />
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
      </Form.Item>
    </Form>
  );
}
export default Addcustomer;
