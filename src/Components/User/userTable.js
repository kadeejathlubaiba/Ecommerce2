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
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
const UserTable = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/ecommerce-backend/api/users/get_user.php")
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

  const deleteUser = (record) => {
    console.log(record);
    console.log(record.userId);
    console.log(JSON.stringify({ userId: record.userId }));
    axios
      .delete("http://localhost/ecommerce-backend/api/users/delete_user.php", {
        data: { userId: record.userId },
      })
      .then((response) => {
        console.log(response.data + "Deleted user Id =" + record.userId);
        setRefresh(refresh + 1);
        console.log(refresh);
      });
  };

  const save = async () => {
    try {
      const row = await form.validateFields();
      //Inserting form values to db
      fetch("http://localhost/ecommerce-backend/api/users/update_users.php", {
        body: JSON.stringify(row),
        method: "PUT",
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.message === "user updated") {
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
      dataIndex: "userId",
      width: "5%",
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "userName",
      dataIndex: "userName",
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
      title: "Action",
      dataIndex: "userId",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link id={record.userId} onClick={save}>
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
            <Typography.Link id={record.userId}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteUser(record)}
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
  );
};

export default UserTable;
