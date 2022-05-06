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

function Customers() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/ecommerce-backend/api/customer/get_customers.php")
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

  // Search filter
//   const search = (value) => {
//     if (value === "") {
//       setRefresh(refresh + 1);
//     }
//     else{
//       fetch(`http://localhost/RESTAPI/ecommerce/api/categories/search.php?s=${value}`)
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setData(result.records);
//           // console.log(result.records);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           console.log(error);
//         }
//       );
//     }
//   };

  const isEditing = (record) => record.customerId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        customerId: "",
        customerName: "",
        passwords:"",
        email: "",
        phoneNumber: "",
        gender: "",
       address:"",
       profilePicture:"",
        ...record,
    });
    console.log(record.customerId);
    setEditingKey(record.customerId);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteCustomer = (record) => {
    console.log(record);
    console.log(record.customerId);
    console.log(JSON.stringify({ customerId: record.customerId }))
    fetch("http://localhost/ecommerce-backend/api/customer/delete_customer.php", {

        body: JSON.stringify({ customerId: record.customerId }),

        method: "DELETE",
    })
        .then((res) => res.json())
        .then(
            (result) => {
                if (result.message === "success") {
                    console.log(result);
                    message.success(result.message);
                    setRefresh(refresh + 1);
                    console.log(refresh);
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

  const save = async () => {
    try {
      const row = await form.validateFields();
      // let data = JSON.stringify(row);
      // console.log(data);
      
      //Inserting form values to db
      fetch("http://localhost/ecommerce-backend/api/customer/edit_customer.php", {
      body: JSON.stringify(row),
      method: "PUT",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "success") {
            console.log(result);
            message.success(result.message);
            setRefresh(refresh + 1);
            setEditingKey("");
            console.log(refresh);
          } else {
            message.error(result.message);
          }
        },
        (error) => {
          console.log(error);
          message.error("user not updated");
        }
      ); 
      
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customerId",
      width: "5%",
      editable: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.customerId - b.customerId,
    },
    {
      title: "Name",
      dataIndex: "customerName",
      width: "20%",
      editable: true,
    },
    {
        title: "Email",
        dataIndex: "email",
        width: "20%",
        editable: true,
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        width: "20%",
        editable: true,
      },
      {
        title: "Gender",
        dataIndex: "gender",
        width: "20%",
        editable: true,
      },
      {
        title: "Address",
        dataIndex: "address",
        width: "20%",
        editable: true,
      },
    {
      title: "Action",
      dataIndex: "customerId",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              id={record.customerId}
              onClick={save}
            >
              Save
            </Typography.Link>
            <Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
            </Typography.Link>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
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
          <div class="title">Customers</div>
          <div class="sales-details">
            
          <Button
        type="primary"
        onClick={() => navigate("/addcustomer")}
      >
        Add Customers
      </Button>
      {/* <input
          type="text"
          name="search"
          id="search"
          placeholder="Search categories..."
          onChange={(e) => {
            search(e.target.value);
          }}
        /> */}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={(record) => record.customerId}
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

export default Customers;