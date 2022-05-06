// import React, { useState } from 'react';
// import '../../components/style.css';
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import { Modal, Button } from 'antd';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// import TextField from '@mui/material/TextField';
// import { useEffect } from 'react';
// import store from '../../srore';
// import { GetAdminDetails } from '../Redux/actions/authAction';

// function Profile(){
  
//   useEffect(() => {
//     GetAdminDetails();
//     //console.log(store.getState());
//     // if(localStorage.getItem('token')){
//     //   PostWithAuthToken('/api/validate_token.php')
//     //   .then((res)=>{
//     //     console.log(res);
//     //   } );
//     // }
//   }, []);

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const validationSchema = yup.object({
//         passwords: yup
//           .string('Enter your password')
//           .min(6, 'Password should be of minimum 6 characters length')
//           .max(15, 'Password should be of maximum 15 characters length')
//           .required('Password is required'),
//       });
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       passwords: '',
//     },
//     validateOnMount: true,
//     validationSchema: validationSchema,
  
//     // onSubmit: (values) => {
//     //   setIsSubmitting(true);
//     //   console.log(JSON.stringify(values, null, 2));
//     //   axios.post('http://localhost/ecommerce-backend/api/login1.php', 
//     //     JSON.stringify(values)
//     //   )
//     //   .then(function (response) {
//     //     console.warn(response.status);
//     //     if(response.data.jwt){
//     //       localStorage.setItem('token', response.data.jwt);
//     //       localStorage.setItem('userId', response.data.data.userId);
//     //       localStorage.setItem('userName', response.data.data.userName);
//     //       console.log(response.data.data.userName);
//     //       navigate('/home');
//     //     }
//     //     else{
//     //       alert('Invalid Credentials Please try again');
//     //       setIsSubmitting(false);
//     //     }

//     //   })
//     //   .catch(function (error) {
//     //     console.log(error);
//     //   });
//     // },
//   });
//     return(
//         <div className="row">
//         <div className="col">
//          <Sidebar/>
//           <section class="home-section">
//             <Navbar/>
        
//             <div class="home-content">
              
//               <div class="sales-boxes">
//                 <div class="recent-sales box">
//                   <div class="sales-details">
//                   <Button type="primary" onClick={showModal}>
//                   Change Password
//                  </Button>
//                   <Modal title="Change Password" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                   <div className="pass">
//          <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           id="passwords"
//           name="passwords"
//           label="Old Password"
//           type="password"
//           value={formik.values.passwords}
//           onChange={formik.handleChange}
//           error={formik.touched.passwords && Boolean(formik.errors.passwords)}
//           helperText={formik.touched.passwords && formik.errors.passwords}
//         />
//         <TextField
//           fullWidth
//           id="passwords"
//           name="passwords"
//           label="New Password"
//           type="password"
//           value={formik.values.passwords}
//           onChange={formik.handleChange}
//           error={formik.touched.passwords && Boolean(formik.errors.passwords)}
//           helperText={formik.touched.passwords && formik.errors.passwords}
//         />
//         <TextField
//           fullWidth
//           id="passwords"
//           name="passwords"
//           label="Confirm Password"
//           type="password"
//           value={formik.values.passwords}
//           onChange={formik.handleChange}
//           error={formik.touched.passwords && Boolean(formik.errors.passwords)}
//           helperText={formik.touched.passwords && formik.errors.passwords}
//         />
//         <Button color="primary" variant="contained" fullWidth type="submit" disabled={ !formik.isValid || isSubmitting}>
//           Login
//         </Button>
//       </form>
//     </div>
//                   </Modal>        
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           </section>
        
//         </div>
//         </div>
         
//     );
// };

//  export default Profile;