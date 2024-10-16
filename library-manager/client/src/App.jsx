import { Provider } from 'react-redux';
import Header from './components/header/Header';
import AllRoutes from './routes/AllRoutes';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <Provider store={store}>
        <Header />
        <AllRoutes />
        <ToastContainer 
                position="top-center"
                autoClose={3000} 
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
                toastClassName="custom-toast"
            />
      </Provider>
    </div>
  );
}

export default App;
