import React from 'react'
import './userNotFound.scss';
import {Link} from 'react-router-dom';
const UserNotFound = () => {
  return  (
    <div className='user-not-found'>
      <p><b>Usuario no encontrado</b></p>
      <p>
        Es posible que el usuario haya sido eliminado o el enlace no sea correcto      </p>
        <Link to = '/'>
          Volver a la home
        </Link>
    </div>
  )

}

export default UserNotFound;