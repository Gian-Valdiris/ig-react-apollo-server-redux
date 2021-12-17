import { Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import './EmailForm.scss';

export default function FormDataChange({ type, name: nombre }) {

  const Formik = useFormik({
    initialValues: {
      [nombre]: '',
    },
    validationSchema: Yup.object({
      [nombre]:
        type === 'email'
          ? Yup.string().email().required()
          : Yup.string().required()
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="email-form">
      <Form className="space-form" onSubmit={Formik.handleSubmit}>
        <Form.Input
          placeholder={`ingrese ${nombre}`}
          name = {nombre} 
          value = {Formik.values.nombre}
          onChange={Formik.handleChange}
          error ={Formik.errors[nombre] && 'Error'}
        />
        <Button className="btn-submit">Guardar</Button>
      </Form>
    </div>
  );
}
