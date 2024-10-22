import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from './slices/AuthSlice';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/header/Header';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      dispatch(setUser({...userData }));
    }
  }, [dispatch]);

  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <AllRoutes />
          <ToastContainer 
            position="top-center"
            autoClose={2000} 
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
            toastClassName="custom-toast"
          />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
