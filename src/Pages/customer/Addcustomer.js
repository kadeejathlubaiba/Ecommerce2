import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import '../../components/style.css'
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Card } from "antd";


function Addcustomer() {
    let navigate = useNavigate();
    // const inp = {

    //     fontfamily: 'sans-serif',

    //     letterSpacing: '3px'
    // }
    // const move = () => {
    //     navigate('../../');
    // }
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
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item
                            name="passwords"
                            label="password"
                            
                        >
                            <Input type="password" placeholder="Enter password" />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="phoneNumber"
                        >
                            <Input placeholder="Enter phoneNumber" />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="gender"
                        >
                            <Input placeholder="Enter gender" />
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
