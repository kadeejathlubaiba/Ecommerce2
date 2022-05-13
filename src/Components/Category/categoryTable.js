import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  message,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
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
const CategoryTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/ecommerce-backend/api/category/get_category.php")
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
  const isEditing = (record) => record.categoryId === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      categoryId: "",
      categoryName: "",
      description: "",
      ...record,
    });
    console.log(record.categoryId);
    setEditingKey(record.categoryId);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const deleteCategory = (record) => {
    axios
      .delete(
        "http://localhost/ecommerce-backend/api/category/delete_category.php",
        {
          data: { categoryId: record.categoryId },
        }
      )
      .then((response) => {
        console.log(response.data.statusCode);
        console.log(response.data + "Deleted user Id =" + record.categoryId);
        setRefresh(refresh + 1);
        console.log(refresh);
      });
  };
  const save = async () => {
    try {
      const row = await form.validateFields();
      //Inserting form values to db
      fetch(
        "http://localhost/ecommerce-backend/api/category/edit_category.php",
        {
          body: JSON.stringify(row),
          method: "PUT",
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.message === "Category was updated.") {
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
            message.error("Unable to update category !!");
          }
        );
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "categoryId",
      width: "5%",
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      width: "20%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "categoryId",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link id={record.categoryId} onClick={save}>
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
            <Typography.Link id={record.categoryId}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteCategory(record)}
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
        rowKey={(record) => record.categoryId}
        bordered
        dataSource={data && data}
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

export default CategoryTable;
