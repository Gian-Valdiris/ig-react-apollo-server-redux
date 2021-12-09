import './RigthHeader.scss';
import {Icon,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import imgNotFOund from '../../../assets/avatar.png';
import React from 'react'
import {useSelector} from 'react-redux';

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
