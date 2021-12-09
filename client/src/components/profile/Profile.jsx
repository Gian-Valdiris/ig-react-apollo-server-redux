
import './Profile.scss';
import {Grid,Image} from 'semantic-ui-react';
import ModalBasic from '../modal/ModalBasic';
import {useSelector} from 'react-redux';
import AvatarForm from '../user/AvatarForm';
import imageNotFound from '../../assets/avatar.png';
import {useState} from 'react';

const {Column} = Grid;

export default  function  Profile  ({data:{getUser}}){
  
  const {username,name,siteWeb,description} = getUser;
  const usuarioLogeado = useSelector(state=>state.authReducer.dataUser.username);
  const [show,setShow] = useState(false);
  const [titleModal,setTitleModal] = useState('');
  const [childrenModal,setChildrenModal] = useState(null);

  const handleModal=(type)=>{
    switch (type) {
      case 'avatar':
        setTitleModal('Cambiar foto de perfil');
        setChildrenModal(<AvatarForm setShowModal={setShow} />)
        setShow(true)
        break;
    
      default:
        break;
    }
    
  }
  
  return(
    <>
      <Grid className='profile'>

        <Column width={5} className='profile__left'>
          <Image src  = {imageNotFound} avatar onClick={()=> usuarioLogeado===username &&  handleModal('avatar')}  />
        </Column>
        
        <Column width={11} className='profile__right'>
          <div>HEADER PROFILE</div>
          <div>Followers</div>
          <div className='other'>
            <p className='name'>{name}</p>
            {siteWeb && (<a href = {siteWeb} >{siteWeb}</a>)}
            {description && (<p className='description' >{description}</p>)}
          </div>
        </Column>

      </Grid>
      <ModalBasic show ={show} setShow={setShow} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  )
}