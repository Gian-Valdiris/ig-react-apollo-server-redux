
import './Profile.scss';

import {useState} from 'react';
import {Grid,Image} from 'semantic-ui-react';
import {useSelector} from 'react-redux';


import AvatarForm from '../AvatarForm';
import ModalBasic from '../modal/ModalBasic';
import imageNotFound from '../../assets/avatar.png';

const {Column} = Grid;

export default  function  Profile  ({data:{getUser}}){
  
  const {username,name,siteWeb,description,avatar} = getUser;
  const usuarioLogeado = useSelector(state=>state.authReducer.dataUser.username);
  const [showModal,setShowModal] = useState(false);
  const [titleModal,setTitleModal] = useState('');
  const [childrenModal,setChildrenModal] = useState(null);

  const handleModal=(type)=>{

    switch (type) {

      case 'avatar':{
        setTitleModal('Cambiar foto de perfil');// Titulo del modal
        setChildrenModal(<AvatarForm setShowModal={setShowModal} />)// muestra el modal que sera reenderizado
        setShowModal(true) // para mostar el modal
        break;
      }
    
      default:
        break;
    }
    
  }
  
  return(
    <>
      <Grid className='profile'>

        <Column width={5} className='profile__left'>
          <Image src  = {avatar?avatar:imageNotFound} avatar onClick={()=> usuarioLogeado===username &&  handleModal('avatar')}  />
        </Column>
        
        <Column width={11} className='profile__right'>
          <div>HEADER PROFILE</div>
          <div>Followers</div>
          <div className='other'>
            <p className='name'> {name} </p>
            {siteWeb && (<a href = {siteWeb} >{siteWeb}</a>)}
            {description && (<p className='description' >{description}</p>)}
          </div>
        </Column>

      </Grid>
      <ModalBasic showModal ={showModal} setShowModal={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  )
}