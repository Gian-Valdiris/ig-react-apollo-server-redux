import './ModalBasic.scss';

import {Modal} from 'semantic-ui-react'

function ModalBasic( {showModal,setShowModal,title,children}) {


  return (
    <Modal size='mini' open={showModal} onClose={()=>setShowModal(false)} className='modal-basic'>
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  )
}

export default ModalBasic
