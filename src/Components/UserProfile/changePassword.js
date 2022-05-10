
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { Modal, Button } from 'antd';


export default function ChangePassword() {
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
  const Schema = Yup.object().shape({
    oldPassword: Yup.string("Enter your current password")
    .required("Current Password is required"),
    passwords: Yup.string("Enter your new password")
      .required("New password is required")
      .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "Password must contain Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),

    newPassword: Yup.string("Confirm Password")
      .oneOf([Yup.ref("passwords"), null], "Passwords must match")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      passwords: "",
      newPassword: "",
      userId: localStorage.getItem("userId"),
    },
  });
  
  return (
    <>
    <div id="passwordupdate">
                     <Formik
                      initialValues={{
                        oldPassword: "",
                        passwords: "",
                        newPassword: "",
                        userId: localStorage.getItem("userId"),
                      }}
                      validationSchema={Schema}
                      onSubmit={(values) => {
                        console.log("checking");
                        setIsSubmitting(true);
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
                              navigate('/');
                            } else {
                              message.error(response.data.message);

                              setIsSubmitting(false);
                            }
                          })
                          .catch((error) => {
                            message.error("Try again later");
                            //formik.resetForm()
                            setIsSubmitting(false);
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
                      }) => {
                        return (
                          <>
                          <Button type="primary" onClick={showModal}>
                          Change Password
                        </Button>
                         <Modal title="Update Your Password" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
                         <form onSubmit={handleSubmit} className="form-val">
                            <br />
                            <div className="input-containers">
                              <label>Current Password</label>
                              <br />
                              <input
                                type="password"
                                name="oldPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.oldPassword}
                                error={
                                  formik.touched.oldPassword &&
                                  Boolean(formik.errors.oldPassword)
                                }
                              />
                              <br />
                              <span className="error" style={{ color: "red" }}>
                                {errors.oldPassword}
                              </span>
                            </div>

                            <br />
                            <div className="input-containers">
                              <label>New Password</label>
                              <br />
                              <input
                                type="password"
                                name="passwords"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.passwords}
                                error={
                                  formik.touched.passwords &&
                                  Boolean(formik.errors.passwords)
                                }
                              />
                              <br />
                              <span className="error" style={{ color: "red" }}>
                                {errors.passwords}
                              </span>
                            </div>
                            <br />
                            <div className="input-containers">
                              <label>Confirm Password</label>
                              <br />
                              <input
                                type="password"
                                name="newPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.newPassword}
                                error={
                                  formik.touched.newPassword &&
                                  Boolean(formik.errors.newPassword)
                                }
                              />
                              <br />
                              <span className="error" style={{ color: "red" }}>
                                {errors.newPassword}
                              </span>
                            </div>
                            <div className="button-container">
                              <input type="submit"  disabled={!isValid || isSubmitting} value="Submit" />
                              <input type="reset" value="Reset" onClick={(e)=>resetForm()} />
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
