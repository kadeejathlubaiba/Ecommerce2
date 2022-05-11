import '../Layout/style.css'
import { useLocation, useNavigate } from "react-router-dom";
import React,{useEffect} from "react";
import { Form, Input, message, Button, Space, Card,Select } from "antd";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from "../Layout/sidebar";
import Navbar from "../Layout/navbar";

function Addcustomer() {
    let navigate = useNavigate();
    const location= useLocation();
    const [form] = Form.useForm();
    const mov = () => {
        navigate('/customer');
    }
//   console.log(location.state.name);
//   console.log(location.state.customerId);
  useEffect(() => {
    fetch(`http://localhost/ecommerce-backend/api/customer/get_customerid.php`,
    {body:JSON.stringify({customerId:location.state.customerId}),
    method:"POST"}
    )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            console.log(result[0].customerName);
            form.setFieldsValue({
               customerId:result[0].customerId,
               customerName:result[0].customerName,
              email:result[0].email,
              passwords: result[0].passwords,
              phoneNumber: result[0].phoneNumber,
              address:result[0].address,
              gender:result[0].gender
              //profilePicture:result.profilePicture

            });
          },
          (error) => {
            console.log(error);
          }
        );
  }, []);
   
    // const props = {
    //     name: 'file',
    //     action: 'http://localhost/ecommerce-backend/api/customer/create_customer.php',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };
    const onFinish = (values) => {
        console.log(values.customerId);
                if(values.customerId){
                    fetch("http://localhost/ecommerce-backend/api/customer/edit_customer.php",{body:JSON.stringify(values), method:"PUT"})
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log(JSON.stringify(values));
                        if (result.message === "success") {
                            console.log(result);
                            message.success(result.message);
                            form.resetFields();
                           navigate("/customer");
                        }
                        else{
                            message.error(result.message);
                        }
                    },
                    (error) => {
                        console.log(error);
                        message.error(error.message);
                      },
                    );
                  }
                  else{
                  fetch("http://localhost/ecommerce-backend/api/customer/create_customer.php",{body:JSON.stringify(values), method:"POST"})
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log(result);
                      console.log(JSON.stringify(values));
                        if (result.message === "success") {
                            console.log(result);
                            message.success(result.message);
                            form.resetFields();
                        }
                        else{
                            message.error(result.message);
                        }
                    },
                (error) => {
                    console.log(error);
                    message.error(error.message);
                },
            );
        }
    };
    
    const onFinishFailed = () => {
        message.error("Submit failed!");
    };


    const onReset = () => {
        form.resetFields();
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
        <div className="row">
        <div className="col">
         <Sidebar/>
          <section class="home-section">
            <Navbar/>
        
            <div class="home-content">
              <div class="sales-boxes">
                <div class="recent-sales box">
                  <div class="title"></div>
                  <div class="sales-details">
                  <Card title={location.state.name}>
                    <Form
                        validateMessages={validateMessages}
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="customerId" >
                            <Input style={{"display":"none"}} />
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
                        <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        </Form.Item> */}
                       
                        <Form.Item>
                            <br />
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

