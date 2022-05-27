import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Formik,validateYupSchema } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { Modal, Button } from "antd";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LoadingSpinner from '../../Utils/Loader/loadingSpinner';
import { ValidatePassword } from "./validatePassword";
import { yupToFormErrors } from "formik";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string("Enter your current password").required(
    "Current Password is required"
  ),
  passwords: Yup.string("Enter your new password")
    .required("New password is required")
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .required("New password is required")

    .matches(/[A-Z].*[A-Z]/, "must contain two uppercase characters")
    .matches(/[a-z].*[a-z]/, "must contain 2 lowercase characters")
    .test(
      "atMost2SpecialCharacters",
      "Atmost 2 special characters are allowed!",
      function (value) {
        return new Promise((resolve, reject) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
          const allFoundCharacters = value.match(specialChars);
          if (allFoundCharacters.length > 2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    ),

  newPassword: Yup.string("Confirm Password")
    .oneOf([Yup.ref("passwords"), null], "Passwords must match")
    .required("Password is required"),
});

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [data, setData] = useState(0);
  let navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      passwords: "",
      newPassword: "",
      userId: localStorage.getItem("userId"),
    },
  });
  const validateYupSchemaMultiErrors = async (values, schema) => {
    if (values && values.oldPassword) {
      setIsSubmitting({
        oldPassword: values.oldPassword,
        passwords: values.passwords,
        newPassword: values.newPassword,
      });
    }
    try {
      await validateYupSchema(values, schema);
      return {};
    } catch (e) {
      return yupToFormErrors(e, { showMultipleFieldErrors: true });
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            oldPassword: "",
            passwords: "",
            newPassword: "",
            userId: localStorage.getItem("userId"),
          }}
          validationSchema={passwordSchema}
          onSubmit={(values) => {
            console.log("checking");
            setIsSubmitting(true);
            setIsLoading(true);
            console.log(JSON.stringify(values, null, 2));
            axios
              .post(
                "http://localhost/ecommerce-backend/api/users/changePassword.php",
                JSON.stringify(values, null, 2)
              )
              .then((response) => {
                console.log(response.data.message);
                if (response.data.message === "Password updated.") {
                  message.success(response.data.message);

                  setIsSubmitting(false);
                  setIsLoading(false);
                  navigate("/");
                } else {
                  message.error(response.data.message);

                  setIsSubmitting(false);
                  setIsLoading(false);
                }
              })
              .catch((error) => {
                message.error("Try again later");
                setIsSubmitting(false);
                setIsLoading(false);
              });
          }}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            isValid,
            touched
          }) => {
            return (
              <>
                <Button type="primary" onClick={showModal}>
                  Change Password
                </Button>
                <Modal
                  title="Update Your Password"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {isLoading ? <LoadingSpinner /> :"input-containers" }
                  <form onSubmit={handleSubmit} className="form-val">
                    <br />
                    <div className="input-containers">
                      <label>Current Password</label>
                      <br />
                      <Input.Password
                        type="password"
                        name="oldPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.oldPassword}
                        error={
                          formik.touched.oldPassword &&
                          Boolean(formik.errors.oldPassword)
                        }
                        placeholder="input password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <br />
                      {/* <span className="error" style={{ color: "red" }}>
                        {errors.oldPassword}
                      </span> */}
                    </div>

                    <br />
                    <div className="input-containers">
                      <label>New Password</label>
                      <br />
                      <Input.Password
                        type="password"
                        name="passwords"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.passwords}
                        error={
                          formik.touched.passwords &&
                          Boolean(formik.errors.passwords)
                        }
                        placeholder="input password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <br />
                      {/* <span className="error" style={{ color: "red" }}>
                        {errors.passwords}
                      </span> */}
                    </div>
                    <br />
                    <div className="validate">
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "must contain two uppercase characters",
                  touched,
                  values.newPassword
                )}
              >
                2 uppercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "must contain 2 lowercase characters",
                  touched,
                  values.newPassword
                )}
              >
                2 lowercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Password should be of minimum 6 characters length",
                  touched,
                  values.newPassword
                )}
              >
                Minimum 6 characters
              </span>

              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Atmost 2 special characters are allowed!",
                  touched,
                  values.newPassword
                )}
              >
                Almost 2 special characters
              </span>
            </div><br />
                    <div className="input-containers">
                      <label>Confirm Password</label>
                      <br />
                      <Input.Password
                        type="password"
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.newPassword}
                        error={
                          formik.touched.newPassword &&
                          Boolean(formik.errors.newPassword)
                        }
                        placeholder="input password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <br />
                      {/* <span className="error" style={{ color: "red" }}>
                        {errors.newPassword}
                      </span> */}
                    </div>
                    <div className="button-container">
                      <Button
                        className="btn-submit"
                        type="primary"
                        htmlType="submit"
                        disabled={!isValid || isSubmitting || isLoading}

                      >
                        Submit
                      </Button>
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={(e) => resetForm()}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </Modal>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
