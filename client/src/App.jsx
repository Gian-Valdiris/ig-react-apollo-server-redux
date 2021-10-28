import Auth from './pages/auth/Auth';
import { ToastContainer} from 'react-toastify';

function App() {
  // const [auth,setAuth]=useState(undefined);
  const auth =false;

  return (
    <div>
      {!auth?<Auth />:<h1>Estas logeado</h1>}
      <ToastContainer />
    </div>
  );
}

export default App;
