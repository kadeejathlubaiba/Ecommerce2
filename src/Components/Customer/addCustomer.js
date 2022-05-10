import Sidebar from "../Layout/sidebar";
import Navbar from "../Layout/navbar";
import '../Layout/style.css'
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Card,Select } from "antd";


function Addcustomer() {
    let navigate = useNavigate();
    const mov = () => {
        navigate('/customer');
    }
    const [form] = Form.useForm();

    const onFinish = (values) => {
        fetch("http://localhost/ecommerce-backend/api/customer/create_customer.php", { body: JSON.stringify(values), method: "POST" })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message === "success") {
                        console.log(result);
                        message.success(result.message);
                        form.resetFields();
                    }
                    else {
                        message.error(result.message);
                    }
                },
                (error) => {
                    console.log(error);
                    message.error(error.message);
                },
            );
    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };


    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className="row">
        <div className="col">
         <Sidebar/>
          <section class="home-section">
            <Navbar/>
        
            <div class="home-content">
              <div class="sales-boxes">
                <div class="recent-sales box">
                  <div class="title">Add Customer</div>
                  <div class="sales-details">
                  <Card title=" Add Customers">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
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
                                 required:true,
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
                        <Form.Item
                            name="address"
                            label="address"
                        >
                            <Input.TextArea placeholder="address" />
                        </Form.Item>
                        {/* <Form.Item
                            name="profilePicture"
                            label="profilePicture"
                        >
                            <Input.TextArea placeholder="profilePicture" />
                        </Form.Item> */}
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <br /><br />
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button><br />
                                <Button type="primary" htmlType="button" onClick={mov}>
                                    Back
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
                  
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        
        </div>
        </div>
        
        );
}


export default Addcustomer;