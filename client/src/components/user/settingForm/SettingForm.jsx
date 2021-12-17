
import {Button} from 'semantic-ui-react';
import {useDispatch} from 'react-redux';
import {useApolloClient} from '@apollo/client';
import {useHistory} from 'react-router-dom';

import {deleteUser} from '../../../redux/reducers/userAuth';
import {removeStorage} from '../../../utils/removeStorage'

// Components
import PasswordForm from '../passwordForm';
import FormDataChange from '../FormChange';

import './SettingForm.scss'


const SettingForm = ({setShowModal,setChildrenModal, setTitleModal}) => {
  const history = useHistory();
  const client = useApolloClient();

  const changeAttr=({target})=>{
    switch(target.name){

      case 'change-password':
        setTitleModal('Cambiar Tu contraseña')
        setChildrenModal(<PasswordForm />)
        break;
      case 'change-email':
        setTitleModal('Cambiar el email');
        setChildrenModal(<FormDataChange type='email' name = 'email'/>)
        break;
      case 'change-description':
        setTitleModal('Cambiar descripcion');
        setChildrenModal(<FormDataChange type='text' name ='description' />)
        break;
      case 'change-siteweb':
        setTitleModal('Cambiar sitioWeb')
        setChildrenModal(<FormDataChange type='text' name = 'siteWeb' />)
        break;
      default:
        console.log('Opcion incorrecta')
        break;
    }
  }
  const onLogout=()=>{
    client.clearStore();
    dispatch(deleteUser())  
    history.push('/') 
    removeStorage()

  }


  const dispatch = useDispatch()
  return (
    <div className='setting-form'>
      <Button onClick={changeAttr} name ='change-password'>Cambiar Contraseña</Button>
      <Button onClick={changeAttr} name = 'change-email'>Cambiar Email</Button>
      <Button onClick={changeAttr} name = 'change-description'>Description</Button>
      <Button onClick={changeAttr} name= 'change-siteweb'>Sitio Web </Button>
      <Button onClick={onLogout}>Cerrar seccion</Button>
      <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
    </div>
  )
}


export default SettingForm
