import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { BiHide, BiShow } from "react-icons/bi";
import { useRegisterUserMutation } from '../redux/slices/userSlices';
import { MdMovie } from 'react-icons/md';
const userRegister = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    username: '',
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })
  const handleSubmit = (values) => {
    const { username, email, password } = values;
    registerUser({ username, email, password })
      .then((res) => {
        const status = res?.data?.status;
        if (status) {
          toast.success(res?.data?.message);
          navigate('/user-login');
        } else {
          toast.error(res?.data?.message);
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='w-full p-4'>
      <div className='w-[90%] md:w-[40%] lg:w-[30%] p-4 shadow rounded mx-auto mt-[10%] bg-white'>
        <Formik onSubmit={handleSubmit} enableReinitialize
          initialValues={initialValues} validationSchema={validationSchema}>
          <Form className='w-full space-y-6 text-slate-800'>
            <div className='w-full flex flex-row gap-3 justify-center'>
              <MdMovie size={20} />
              <h1 className='text-base font-medium tracking-wide hidden md:block  '>Gosaar <span className='text-red-500'>Movies</span></h1>
              <span className='text-base'> - Register </span>
            </div>
            <div className='w-full'>
              <Field type='text' name='username' placeholder="Enter username"
                className='w-full p-3 rounded border' />
              <ErrorMessage className='text-red-500' name='username' component='div' />
            </div>
            <div className='w-full'>
              <Field type='text' name='email' placeholder="Enter email"
                className='w-full p-3 rounded border' />
              <ErrorMessage className='text-red-500' name='email' component='div' />
            </div>
            <div className='w-full relative'>
              <Field type={showPassword} name='password' placeholder="Enter password"
                className='w-full p-3 rounded border' />
              {
                showPassword == 'password' ?
                  <BiHide className=' absolute top-3 right-3' size={20} onClick={() => setShowPassword('text')} />
                  : <BiShow className=' absolute top-3 right-3' size={20} onClick={() => setShowPassword('password')} />
              }
              <ErrorMessage className='text-red-500' name='password' component='div' />

            </div>
            <button type='submit' className='w-full text-base font-medium bg-slate-800  text-white p-3 rounded shadow'>Register</button>
            <p className='w-full text-center' > <span className='inline text-base font-light'>Already Registred ? </span> <Link className='inline text-base font-medium' to='/user-Login'>Login</Link></p>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default userRegister