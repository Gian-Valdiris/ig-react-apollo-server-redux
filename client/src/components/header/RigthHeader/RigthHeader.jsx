import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import ModalUpload from '../../../components/modal/modalUpload';
import imgNotFOund from '../../../assets/avatar.png';
import './RigthHeader.scss';

function RigthHeader() {
  const { username } = useSelector((state) => state.authReducer.dataUser);
  const [showModal, setshowModal] = useState(false);

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>

        <Icon name="plus"  onClick={()=>setshowModal(true)} />

        <Link to={`/${username}`}>
          <Image src={imgNotFOund} avatar />
        </Link>
      </div>
      <ModalUpload showModal={showModal} setShowModal={setshowModal} />
    </>
  );
}

export default RigthHeader;
