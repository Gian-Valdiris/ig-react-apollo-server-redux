import '../../../scss/index.sass';
import './LoginForm.sass';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';

export default function LoginForm() {
  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:yup.object({
      email:yup.string().email('Email not valid').required('email is required'),
      password:yup.string().min(8,'min 3').required('password is required')
    }),
    onSubmit(data) {
      console.log(data);
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        logeate para ver fotos y videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={Formik.handleSubmit}>
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
          control={Form.Input}
          label="password"
          name="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
        />
        <span className='error-form'>{(Formik.errors.password && Formik.touched.password) && Formik.errors.password}</span>
        <Button primary type="submit" className='mt-5'>
          Login
        </Button>
      </Form>
    </>
  );
}
