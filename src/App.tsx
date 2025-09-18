import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/app-router';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store } from './services/store';


const App = () => {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </Provider>



  );
};

export default App;
