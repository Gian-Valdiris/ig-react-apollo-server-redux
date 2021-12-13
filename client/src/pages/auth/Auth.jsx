import { useState } from "react";
// Componentes
import LoginForm from "../../components/auth/login-form";
import RegisterForm from "../../components/auth/register-form";
// Componentes de semantic 
import { Container, Image } from "semantic-ui-react";
// // Imagenes 
import Instaclone from "../../assets/instaclone.png";
// Stilos
import "./Auth.sass";

export default function Auth() {

  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={Instaclone} />
      
      <div className="container-form">
        {
          showLogin ?
          (<LoginForm />):
          (<RegisterForm setShowLogin={setShowLogin} />)
        }
      </div>
      
      <div className="change-form">
        {
          showLogin ?
            (<span onClick={() => setShowLogin(false)}>Registrarme</span>) : 
            (<span onClick={() => setShowLogin(true)}>Iniciar seccion</span>)
        }
      </div>
    </Container>
  );
}