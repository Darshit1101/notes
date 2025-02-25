import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from './Store';//redux
import { Provider } from 'react-redux';//redux
import en from '@shopify/polaris/locales/en.json';//shopify polaris
import { AppProvider } from '@shopify/polaris';//shopify polaris
import '@shopify/polaris/build/esm/styles.css';//shopify polaris
import EntryCard from './components/Layout/EntryCard';
import Toastify from './components/Util/Toastify';
import Spinner from './components/Spinner/Spinner';

let authToken = localStorage.getItem('authToken');

function App(props) {
  return (
    <Provider store={store}>
      <AppProvider i18n={en}>
        <Spinner />
        <Toastify />
        <BrowserRouter>
          {
            authToken ?
              <EntryCard component={<props.Component />} />
              :
              <props.Component />
          }
        </BrowserRouter>
      </AppProvider>
    </Provider>
  );
}

export default App;
