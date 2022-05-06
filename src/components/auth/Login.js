import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './Login.css';
import '../config/config'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  passwords: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(15, 'Password should be of maximum 15 characters length')
    .required('Password is required'),
});


function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      passwords: '',
    },
    validateOnMount: true,
    validationSchema: validationSchema,
  
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
      axios.post('http://localhost/ecommerce-backend/api/login1.php', 
        JSON.stringify(values)
      )
      .then(function (response) {
        console.warn(response);
        if(response.data.jwt && response.status === 200){
    //       axios.get('http://localhost/ecommerce-backend/api/validate_token.php',{
    //   headers:{'Authorization': 'Bearer ' + response.data.jwt
    //   }
    // }
    // )
    // .then((res)=>{
    //   console.log(res);
    // } );
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('userId', response.data.data.userId);
          localStorage.setItem('userName', response.data.data.userName);
          console.log(response.data.data.userName);
          navigate('/home');
        }
        else{
          alert('Invalid Credentials Please try again');
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
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          
        />
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
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={ !formik.isValid || isSubmitting}>
          Login
        </Button>
      </form>
    </div>
    )
}

export default Login;