import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../Components/Layout/login.css";
import "../Utils/Config/config";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  passwords: yup.string("Enter your password").required("Password is required"),
});

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      passwords: "",
    },
    validateOnMount: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(
          "http://localhost/ecommerce-backend/api/login1.php",
          JSON.stringify(values)
        )
        .then(function (response) {
          console.warn(response);
          if (response.data.jwt && response.status === 200) {
            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("userId", response.data.data.userId);
            localStorage.setItem("userName", response.data.data.userName);
            localStorage.setItem("email", response.data.data.email);
            localStorage.setItem("gender", response.data.data.gender);
            localStorage.setItem("phoneNumber", response.data.data.phoneNumber);
            navigate("/dashboard");
          } else {
            alert("Invalid Credentials Please try again");
            setIsSubmitting(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  return (
    <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="email">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <span className="error" style={{ color: "red" }}>
            {}
          </span>
        </div>
        <div className="pass">
          {" "}
          <TextField
            fullWidth
            id="passwords"
            name="passwords"
            label="Password"
            type="password"
            value={formik.values.passwords}
            onChange={formik.handleChange}
            error={formik.touched.passwords && Boolean(formik.errors.passwords)}
            helperText={formik.touched.passwords && formik.errors.passwords}
          />
        </div>
        <div className="btn">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!formik.isValid || isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
