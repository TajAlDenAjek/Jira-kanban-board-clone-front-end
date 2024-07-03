import { Provider } from 'react-redux';
import { store } from './redux/store';
import BasicLayout from './layout/BasicLayout';
import './app.css'

const App = () => {
  return (
    <Provider store={store}>
      <BasicLayout />
    </Provider>
  );
};

export default App;