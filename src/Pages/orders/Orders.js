import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  Table,
  Input,
  Button,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  message,
} from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Orders() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/ecommerce-backend/api/orders/orders.php")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          console.log(result);
        },
        
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }, [refresh]);

  

  const isEditing = (record) => record.userId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        customerId: "",
        customerName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        ...record,
    });
    console.log(record.userId);
    setEditingKey(record.userId);
  };

  const cancel = () => {
    setEditingKey("");
  };

  

  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      width: "5%",
      editable: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "customerName",
      dataIndex: "customerName",
      width: "20%",
      editable: true,
    },
    {
        title: "Order date",
        dataIndex: "orderdate",
        width: "20%",
        editable: true,
      },
      {
        title: "Total Price",
        dataIndex: "totalprice",
        width: "20%",
        editable: true,
      },
   
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
return (
<div className="row">
<div className="col">
 <Sidebar/>
  <section class="home-section">
    <Navbar/>

    <div class="home-content">
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Order Listing</div>
          <div class="sales-details">
            
         
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={(record) => record.userId}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            defaultPageSize: 5,
            onChange: cancel,
          }}
        />
      </Form>
          
          </div>
          
        </div>
      </div>
    </div>
  </section>

</div>
</div>

);

};

export default Orders;