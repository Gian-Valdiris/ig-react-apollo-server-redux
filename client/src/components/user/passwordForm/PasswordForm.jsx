
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';

import {UPDATE_PROFILE} from '../../../graphql/Mutations';
import './PasswordForm.scss';



const PasswordForm = () => {

  const [updatePassword,{loading}] = useMutation(UPDATE_PROFILE,{
    onCompleted(data){
      toast.success('Se actualizo la contraseña')
    },
    onError(data){
      toast.error(data.message)
    }
  });

  const Formik = useFormik({
    initialValues: initialValues(),

    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string().required(),
      confirmNewPassword: Yup
        .string()
        .required()
        .oneOf([Yup.ref('newPassword')]),
    }),
    onSubmit: (formData) => {
      updatePassword({variables:{
        input:{
          currentPassword:formData.currentPassword,
          newPassword:formData.newPassword
        }
      }});
    },
  });

  return (
    <div className="password-form">
      <Form onSubmit={Formik.handleSubmit}>
        <Form.Input
          type='password'
          placeholder="Escriba su contraseña actual"
          name="currentPassword"
          value={Formik.values.currentPassword}
          onChange={Formik.handleChange}
          error={Formik.errors.currentPassword && true}
        />
        <Form.Input 
          type='password'
          placeholder="Nueva contraseña" 
          name="newPassword"
          value={Formik.values.newPassword}
          onChange={Formik.handleChange}
          error={Formik.errors.newPassword && true}  
        />
        <Form.Input
          type='password'
          placeholder="Confirmar nueva contraseña"
          name="confirmNewPassword"
          value={Formik.values.confirmNewPassword}
          onChange={Formik.handleChange}
          error={Formik.errors.confirmNewPassword && 'La contraseña no es igual'}
        />
        <Button className="btn-submit" loading={loading}>Cambiar Contraseña</Button>
      </Form>
    </div>
  );
};
const initialValues = () => ({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});

export default PasswordForm;
