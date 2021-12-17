import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';




import './HeaderProfile.scss';

const HeaderProfile = ({ getUser ,handleModal}) => {
  const { username } = getUser;
  const { username: usernameLoged } = useSelector((s) => s.authReducer.dataUser);
  return (
    <div className="header-profile">
      <h2>
        {username}
        {username === usernameLoged ? (
          <Button onClick={()=>handleModal('settigns')}>Ajustes</Button>
        ) : (
          <Button>Seguir</Button>
        )}
      </h2>
    </div>
  );
};

export default HeaderProfile;
