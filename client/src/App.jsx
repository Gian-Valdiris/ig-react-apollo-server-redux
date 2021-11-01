import Auth from './pages/auth/Auth';
import { ToastContainer} from 'react-toastify';
import {useSelector} from 'react-redux';
import AppRouter from './routes/Navigation';
function App() {
  const {token:auth} = useSelector(state=>state.authReducer)
  return (
    <div>
      {!auth?<Auth />:<AppRouter />}
      <ToastContainer />
    </div>
  );
}

export default App;
