import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import App from './App.jsx';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';

import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/base.scss';
import './styles/reset.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
