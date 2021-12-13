import './RigthHeader.scss';

import {Link} from 'react-router-dom';
import {Icon,Image} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

import imgNotFOund from '../../../assets/avatar.png';

function RigthHeader() {
  const {username} = useSelector(state =>state.authReducer.dataUser)


  return (
    <div className='right-header'>
      <Link to = '/'>
        <Icon name = 'home' />
      </Link>
  
      <Icon name='plus' />
  
      <Link to = {`/${username}`}>
        <Image src={imgNotFOund} avatar />
      </Link>
    </div>
  )
}

export default RigthHeader
