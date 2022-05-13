import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space } from "antd";

function AddCategoryForm() {
  let navigate = useNavigate();
  const mov = () => {
    navigate("/category");
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetch(
      "http://localhost/ecommerce-backend/api/category/create_category.php",
      { body: JSON.stringify(values), method: "POST" }
    )
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
          label="Category Name"
          name="categoryName"
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
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item>
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
    </>
  );
}

export default AddCategoryForm;
