import Auth from './pages/auth/Auth';
import AppRouter from './routes/Navigation';
import { ToastContainer} from 'react-toastify';

import {useSelector} from 'react-redux';

function App() {
  const {token} = useSelector(state=>state.authReducer)
  return (
    <div>
      {
        !token?
          (<Auth />):
          (<AppRouter />)
      }
      <ToastContainer />
    </div>
  );
}

export default App;
