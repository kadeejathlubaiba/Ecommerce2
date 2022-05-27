import React, { useState } from "react";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";
import { ValidatePassword } from "../UserProfile/validatePassword";
import { yupToFormErrors } from "../UserProfile/yupToFormErrors";
import "../Layout/style.css";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required!"),
  passwords: Yup.string()
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .matches(/[A-Z].*[A-Z]/, "must contain two uppercase characters")
    .matches(/[a-z].*[a-z]/, "must contain 2 lowercase characters")
    .matches(
      /[!@#$%^&()-=+{};:,<.>]/,
      "Atmost 2 special characters are allowed!"
    )
    .test(
      "atMost2SpecialCharacters",
      "Atmost 2 special characters are allowed!",
      function (value) {
        return new Promise((resolve) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
          const allFoundCharacters = value.match(specialChars);
          if (allFoundCharacters && allFoundCharacters.length > 2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    )
    .required("Password is Required"),
  newPassword: Yup.string("Confirm Password")
    .oneOf([Yup.ref("passwords"), null], "Passwords must match")
    .required("Password is required"),
});

export const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  // Enable and Disable the submit button
  const [formData, setFormData] = useState(null);
  const [enable, setEnable] = useState(true);

  const validateYupSchemaMultiErrors = async (values, schema) => {
    if (values && values.oldPassword) {
      setFormData({
        oldPassword: values.oldPassword,
        passwords: values.passwords,
        newPassword: values.newPassword,
      });
    }
    try {
      await validateYupSchema(values, schema);
      setEnable(false);
      return {};
    } catch (e) {
      return yupToFormErrors(e, { showMultipleFieldErrors: true });
    }
  };
  return (
    <Modal
      closable="true"
      visible={visible}
      title="Change Password"
      onCancel={onCancel}
      destroyOnClose="true"
      footer={null}
    >
      <Formik
        initialValues={{ oldPassword: "", passwords: "", newPassword: "" }}
        // onSubmit={(values) => onhandleSubmit(values)}
        onSubmit={(values) => onCreate(values)}
        validate={(values) =>
          validateYupSchemaMultiErrors(values, passwordSchema)
        }
        key="PrimaryDetails"
      >
        {({ errors, touched, values }) => (
          <Form layout="vertical" name="changePassword">
            <Form.Item name="oldPassword" label="Current Password">
              <Input.Password
                name="oldPassword"
                placeholder="Enter your current password"
              />
            </Form.Item>
            <Form.Item name="passwords" label="New Password">
              <Input.Password
                name="passwords"
                placeholder="Enter your new password"
              />
            </Form.Item>

            <div className="validate">
              <span
                className={ValidatePassword(
                  errors.passwords,
                  "must contain two uppercase characters",
                  touched,
                  values.passwords
                )}
              >
                {ValidatePassword(
                  errors.passwords,
                  "must contain two uppercase characters",
                  touched,
                  values.passwords
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                2 uppercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.passwords,
                  "must contain 2 lowercase characters",
                  touched,
                  values.passwords
                )}
              >
                {ValidatePassword(
                  errors.passwords,
                  "must contain 2 lowercase characters",
                  touched,
                  values.passwords
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                2 lowercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.passwords,
                  "Password should be of minimum 6 characters length",
                  touched,
                  values.passwords
                )}
              >
                {ValidatePassword(
                  errors.passwords,
                  "Password should be of minimum 6 characters length",
                  touched,
                  values.passwords
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Minimum 6 characters
              </span>

              <span
                className={ValidatePassword(
                  errors.passwords,
                  "Atmost 2 special characters are allowed!",
                  touched,
                  values.passwords
                )}
              >
                {ValidatePassword(
                  errors.passwords,
                  "Atmost 2 special characters are allowed!",
                  touched,
                  values.passwords
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Almost 2 special characters
              </span>
            </div>
            <br />
            <Form.Item name="newPassword" label="Confirm Password">
              <Input.Password
                name="newPassword"
                placeholder="Re-enter your new password"
              />
            </Form.Item>
            <span className="buttons">
              <ResetButton>Reset</ResetButton>
              <SubmitButton disabled={enable}>Submit</SubmitButton>
            </span>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
