import { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import Instaclone from "../../assets/instaclone.png";
import LoginForm from "../../components/auth/login-form";
import RegisterForm from "../../components/auth/register-form";
import "./Auth.sass";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={Instaclone} />
      <div className="container-form">
        {showLogin ? <RegisterForm setShowLogin={setShowLogin} />:<LoginForm />}
      </div>
      
      <div className="change-form">
        {showLogin ? (
          <>
            !iniciar seccion!
            <span onClick={() => setShowLogin(!showLogin)}>
              Entra con tu cuenta
            </span>
          </>
        ) : (
          <>
            ¿No tienes cuenta?
            <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
          </>
        )}
      </div>
    </Container>
  );
}