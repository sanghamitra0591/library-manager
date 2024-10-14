import { Provider } from 'react-redux';
import './App.css';
import Header from './components/header/Header';
import AllRoutes from './routes/AllRoutes';
import { store } from './redux/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <AllRoutes />
      </Provider>
    </div>
  );
}

export default App;
