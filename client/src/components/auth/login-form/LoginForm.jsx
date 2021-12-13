import './LoginForm.sass';

import * as yup from 'yup';
import jwtDecode from 'jwt-decode';
import { useFormik } from 'formik';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import { Form, Button } from 'semantic-ui-react';

import {useLazyQuery} from '@apollo/client';
import {QUERY_LOGIN} from '../../../graphql/Querys';
import {setUser} from '../../../redux/reducers/userAuth';


export default function LoginForm() {

  const dispath = useDispatch();

  const [makeLogin,{loading}] = useLazyQuery(QUERY_LOGIN,{

    onCompleted({login}){
      const decode= jwtDecode(login.token)
      dispath(setUser({token:login.token,decode}))
      localStorage.setItem('token',login.token)
    },
    onError({message}){
      toast.error(message);
    },
  });

  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:yup.object({
      email:yup.string().email('Email not valid').required('email is required'),
      password:yup.string().min(3,'min 3').required('password is required')
    }),
    onSubmit(data) {
      makeLogin({
        variables:{
          input:data
        }
      })
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        logeate para ver fotos y videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={Formik.handleSubmit} loading={loading}>
        <Form.Field
          className='formg'
          control={Form.Input}
          label="email"
          name="email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>{(Formik.errors.email && Formik.touched.email) && Formik.errors.email }</span> 

        <Form.Field
          className='formg'
          type='password'
          control={Form.Input}
          autoComplete="off"
          label="password"
          name="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>{(Formik.errors.password && Formik.touched.password) && Formik.errors.password}</span>

        <Button primary type="submit" className='mt-5'> Login </Button>
        
      </Form>
    </>
  );
}
