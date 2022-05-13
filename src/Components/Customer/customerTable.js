import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Form, Typography } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../Components/Layout/style.css";
import axios from "axios";

const CustomerTable = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/ecommerce-backend/api/customer/get_customers.php")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [refresh]);
  const deleteCustomer = (record) => {
    console.log(JSON.stringify({ customerId: record.customerId }));
    axios
      .delete(
        "http://localhost/ecommerce-backend/api/customer/delete_customer.php",
        {
          data: { customerId: record.customerId },
        }
      )
      .then((response) => {
        console.log(response.data + "Deleted user Id =" + record.customerId);
        setRefresh(refresh + 1);
        console.log(refresh);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "customerId",
      width: "5%",
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.customerId - b.customerId,
    },
    {
      title: "Name",
      dataIndex: "customerName",
      width: "15%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "15%",
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "15%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "15%",
      editable: true,
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      key: "profilePicture",
      editable: true,
      width: "10%",
      render: (profilePicture) => (
        <img
          width={110}
          alt={profilePicture}
          src={`../../Assets/Images/${profilePicture}`}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "customerId",
      width: "10%",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link
              onClick={() =>
                navigate("/addcustomer", {
                  state: {
                    name: "Update Customer",
                    customerId: record.customerId,
                  },
                })
              }
            >
              <EditTwoTone />
            </Typography.Link>
            <Typography.Link id={record.customerId}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteCustomer(record)}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </Popconfirm>
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => col);

  return (
    <Form form={form} component={false}>
      <Table
        rowKey={(record) => record.customerId}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          defaultPageSize: 5,
        }}
      />
    </Form>
  );
};
export default CustomerTable;
