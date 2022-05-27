import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { PostWithAuthToken} from "../../Utils/Config/api";
import { ChangePasswordForm } from "./changePasswordForm";

const ChangePassword = () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    PostWithAuthToken("users/changePassword.php", values)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "Password updated successfully") {
          message.success(res.data.message);
          localStorage.clear();
          navigate("/"); // Redirect to login page
        } else {
          message.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Change Password
      </Button>
      <ChangePasswordForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ChangePassword;