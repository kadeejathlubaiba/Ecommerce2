import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Form } from "antd";

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

const OrderTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");

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
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      width: "5%",
      editable: true,
      defaultSortOrder: "descend",
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
        }}
      />
    </Form>
  );
};

export default OrderTable;
