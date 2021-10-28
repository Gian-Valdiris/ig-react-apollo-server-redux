import React,{ Fragment} from 'react';
import './RegisterForm.sass';
import {useMutation} from '@apollo/client';
import {REGISTER_MUTATION} from '../../../graphql/Mutations';
import '../../../scss/index.sass';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import {toast} from 'react-toastify';
import * as yup from 'yup';

export default function RegisterForm({ setShowLogin }) {
  
  const [createUser,{error,loading}] = useMutation(REGISTER_MUTATION,{
    onCompleted(){
      toast.success('Usuario creado')
      setShowLogin(ant=>!ant);
    },
    onError(e){}
  });
  const Formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit({name,username,email,password}) {
      createUser({
        variables:{
          input:{
            name,username,email,password
          }
        }
      })
      Formik.resetForm();
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('El nombre es requerido')
        .min(3, 'Nombre no valido'),
      username: yup
        .string()
        .required('El username es requerido')
        .matches(/^[a-zA-Z0-9-]*$/, 'username no valido')
        .min(3, 'username muy corto'),
      email: yup
        .string()
        .email('Email no valid ')
        .required('Email is required'),
      password: yup.string().required('password required').min(3, 'min 3'),
      confirmPassword: yup
        .string()
        .required('password required')
        .min(3, 'min 3')
        .oneOf([yup.ref('password')], 'Las contraseñas no son iguales'),
    }),
  });
  return (
    <Fragment>
      <h2 className='register-form-title'>
        Registrate para ver fotos y videos de tus amigos
      </h2>
      <Form
        className='register-form'
        onSubmit={Formik.handleSubmit}
        loading={loading}
      >
        <Form.Field
          className='formg'
          control={Form.Input}
          label='Nombre'
          type='text'
          name='name'
          value={Formik.values.name}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>
          {Formik.errors.name && Formik.touched.name && Formik.errors.name}
        </span>

        <Form.Field
          className='formg'
          control={Form.Input}
          label='Username'
          type='text'
          name='username'
          value={Formik.values.username}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>
          {Formik.errors.username &&
            Formik.touched.username &&
            Formik.errors.username}
        </span>

        <Form.Field
          className='formg'
          control={Form.Input}
          label='email'
          type='text'
          name='email'
          value={Formik.values.email}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>
          {Formik.errors.email && Formik.touched.email && Formik.errors.email}
        </span>

        <Form.Field
          className='formg'
          control={Form.Input}
          label='Password'
          type='password'
          name='password'
          value={Formik.values.password}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>
          {Formik.errors.password &&
            Formik.touched.password &&
            Formik.errors.password}
        </span>
        <Form.Field
          className='formg'
          control={Form.Input}
          label='Confirm password'
          type='password'
          name='confirmPassword'
          value={Formik.values.confirmPassword}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>
          {Formik.errors.confirmPassword &&
            Formik.touched.confirmPassword &&
            Formik.errors.confirmPassword}
        </span>
        <Button primary type='submit' className='mt-5'>
          Registrate
        </Button>
        {
          error && <p>{error.message}</p>
        } 
      </Form>
    </Fragment>
  );
}