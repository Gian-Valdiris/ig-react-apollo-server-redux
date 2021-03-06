

import { Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';


import {UPDATE_PROFILE} from '../../../graphql/Mutations';
import './EmailForm.scss';

export default function FormDataChange({ type, name: nombre ,setShowModal}) {

  const [UpdateProfile,{loading}] = useMutation(UPDATE_PROFILE,{
    onCompleted(data){
      console.log('Se completo');
      toast.success(`se actualizo ${nombre}`);
      setShowModal(false)
    },
    onError({message:error}){
      console.log({error})
    }
  })

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
      console.log(data)
      UpdateProfile({variables:{
        input:data
      }})
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
        <Button className="btn-submit" loading={loading}>Guardar</Button>
      </Form>
    </div>
  );
}
